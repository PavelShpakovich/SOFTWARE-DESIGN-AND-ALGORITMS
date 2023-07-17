import { Either, fromPromise, ap, right, getOrElse, flatten, left } from './fp/either';
import { pipe } from './fp/utils';
import { fold, fromNullable, some, none, Maybe } from './fp/maybe';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, Demand, ExecutorUser, User } from './types';
import { fromCompare, ordNumber } from './fp/ord';
import { sort, map } from './fp/array';
import { distance } from './utils';

type Response<R> = Promise<Either<string, R>>;

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> =>
  fromPromise(
    fetchClient().then((clients) =>
      map<User & { reward: number; demands: Demand[] }, ClientUser>((client) => ({
        ...client,
        demands: fromNullable(client.demands),
      }))(clients)
    )
  );

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

const sortTextMap = {
  [SortBy.distance]: 'distance to executor',
  [SortBy.reward]: 'highest reward',
};

export const show =
  (sortBy: SortBy) =>
  (clients: Array<ClientUser>) =>
  (executor: ExecutorUser): Either<string, string> => {
    const predicate = (x: ClientUser, y: ClientUser) =>
      sortBy === SortBy.reward
        ? ordNumber.compare(y[sortBy], x[sortBy])
        : ordNumber.compare(distance(executor.position, x.position), distance(executor.position, y.position));

    const filterClients = (sortedClients: ClientUser[]): ClientUser[] =>
      sortedClients.filter((client) => {
        return fold<Demand[], boolean>(
          () => true,
          (demands) => demands.every((demand) => executor.possibilities.includes(demand))
        )(client.demands);
      });

    const convertToMaybe = (filteredClients: ClientUser[]): Maybe<ClientUser[]> =>
      filteredClients.length ? some(filteredClients) : none;

    const mapClientsToText = (maybeClientsValue: ClientUser[]): string =>
      map<ClientUser, string>(
        (client) =>
          `name: ${client.name}, distance: ${distance(executor.position, client.position)}, reward: ${client.reward}`
      )(maybeClientsValue).join('\n');

    const getFirstLineOfText = (maybeClientsValue: ClientUser[]): string =>
      maybeClientsValue.length === clients.length
        ? 'This executor meets all demands of all clients!'
        : `This executor meets the demands of only ${maybeClientsValue.length} out of ${clients.length} clients`;

    const getResult = (maybeClients: Maybe<ClientUser[]>): Either<string, string> =>
      fold<ClientUser[], Either<string, string>>(
        () => left('This executor cannot meet the demands of any client!'),
        (maybeClientsValue) =>
          right(
            `${getFirstLineOfText(maybeClientsValue)}\n\nAvailable clients sorted by ${
              sortTextMap[sortBy]
            }:\n${mapClientsToText(maybeClientsValue)}`
          )
      )(maybeClients);

    return pipe(sort(fromCompare(predicate))(clients), filterClients, convertToMaybe, getResult);
  };

export const main = (sortBy: SortBy): Promise<string> =>
  Promise.all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) =>
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    );
