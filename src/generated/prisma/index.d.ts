
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AuthIdentity
 * 
 */
export type AuthIdentity = $Result.DefaultSelection<Prisma.$AuthIdentityPayload>
/**
 * Model OtpChallenge
 * 
 */
export type OtpChallenge = $Result.DefaultSelection<Prisma.$OtpChallengePayload>
/**
 * Model PasswordResetAuthorization
 * 
 */
export type PasswordResetAuthorization = $Result.DefaultSelection<Prisma.$PasswordResetAuthorizationPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model SecurityEvent
 * 
 */
export type SecurityEvent = $Result.DefaultSelection<Prisma.$SecurityEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OtpPurpose: {
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET',
  PHONE_VERIFICATION: 'PHONE_VERIFICATION',
  PHONE_LOGIN: 'PHONE_LOGIN',
  PHONE_PASSWORD_RESET: 'PHONE_PASSWORD_RESET'
};

export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose]


export const AuthProvider: {
  GOOGLE: 'GOOGLE'
};

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider]


export const SecurityEventType: {
  REGISTER: 'REGISTER',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  LOGOUT_ALL: 'LOGOUT_ALL',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_REUSE_DETECTED: 'REFRESH_REUSE_DETECTED',
  SESSION_REVOKED: 'SESSION_REVOKED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  ACCOUNT_UNLOCKED: 'ACCOUNT_UNLOCKED',
  PHONE_VERIFIED: 'PHONE_VERIFIED',
  PHONE_OTP_REQUESTED: 'PHONE_OTP_REQUESTED',
  PHONE_OTP_RESENT: 'PHONE_OTP_RESENT',
  PHONE_LOGIN_SUCCESS: 'PHONE_LOGIN_SUCCESS',
  PHONE_LOGIN_FAILURE: 'PHONE_LOGIN_FAILURE',
  PHONE_PASSWORD_RESET_REQUESTED: 'PHONE_PASSWORD_RESET_REQUESTED',
  PHONE_PASSWORD_RESET_SUCCESS: 'PHONE_PASSWORD_RESET_SUCCESS',
  PHONE_NUMBER_CHANGED: 'PHONE_NUMBER_CHANGED',
  SMS_DELIVERY_FAILED: 'SMS_DELIVERY_FAILED',
  GOOGLE_LOGIN_SUCCESS: 'GOOGLE_LOGIN_SUCCESS',
  GOOGLE_LOGIN_FAILURE: 'GOOGLE_LOGIN_FAILURE',
  GOOGLE_IDENTITY_CREATED: 'GOOGLE_IDENTITY_CREATED',
  GOOGLE_IDENTITY_LINKED: 'GOOGLE_IDENTITY_LINKED'
};

export type SecurityEventType = (typeof SecurityEventType)[keyof typeof SecurityEventType]

}

export type OtpPurpose = $Enums.OtpPurpose

export const OtpPurpose: typeof $Enums.OtpPurpose

export type AuthProvider = $Enums.AuthProvider

export const AuthProvider: typeof $Enums.AuthProvider

export type SecurityEventType = $Enums.SecurityEventType

export const SecurityEventType: typeof $Enums.SecurityEventType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authIdentity`: Exposes CRUD operations for the **AuthIdentity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthIdentities
    * const authIdentities = await prisma.authIdentity.findMany()
    * ```
    */
  get authIdentity(): Prisma.AuthIdentityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpChallenge`: Exposes CRUD operations for the **OtpChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpChallenges
    * const otpChallenges = await prisma.otpChallenge.findMany()
    * ```
    */
  get otpChallenge(): Prisma.OtpChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetAuthorization`: Exposes CRUD operations for the **PasswordResetAuthorization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetAuthorizations
    * const passwordResetAuthorizations = await prisma.passwordResetAuthorization.findMany()
    * ```
    */
  get passwordResetAuthorization(): Prisma.PasswordResetAuthorizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.securityEvent`: Exposes CRUD operations for the **SecurityEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityEvents
    * const securityEvents = await prisma.securityEvent.findMany()
    * ```
    */
  get securityEvent(): Prisma.SecurityEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AuthIdentity: 'AuthIdentity',
    OtpChallenge: 'OtpChallenge',
    PasswordResetAuthorization: 'PasswordResetAuthorization',
    Session: 'Session',
    RefreshToken: 'RefreshToken',
    SecurityEvent: 'SecurityEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "authIdentity" | "otpChallenge" | "passwordResetAuthorization" | "session" | "refreshToken" | "securityEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AuthIdentity: {
        payload: Prisma.$AuthIdentityPayload<ExtArgs>
        fields: Prisma.AuthIdentityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthIdentityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthIdentityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          findFirst: {
            args: Prisma.AuthIdentityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthIdentityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          findMany: {
            args: Prisma.AuthIdentityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[]
          }
          create: {
            args: Prisma.AuthIdentityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          createMany: {
            args: Prisma.AuthIdentityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthIdentityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[]
          }
          delete: {
            args: Prisma.AuthIdentityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          update: {
            args: Prisma.AuthIdentityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          deleteMany: {
            args: Prisma.AuthIdentityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthIdentityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthIdentityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>[]
          }
          upsert: {
            args: Prisma.AuthIdentityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthIdentityPayload>
          }
          aggregate: {
            args: Prisma.AuthIdentityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthIdentity>
          }
          groupBy: {
            args: Prisma.AuthIdentityGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthIdentityGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthIdentityCountArgs<ExtArgs>
            result: $Utils.Optional<AuthIdentityCountAggregateOutputType> | number
          }
        }
      }
      OtpChallenge: {
        payload: Prisma.$OtpChallengePayload<ExtArgs>
        fields: Prisma.OtpChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          findFirst: {
            args: Prisma.OtpChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          findMany: {
            args: Prisma.OtpChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          create: {
            args: Prisma.OtpChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          createMany: {
            args: Prisma.OtpChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          delete: {
            args: Prisma.OtpChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          update: {
            args: Prisma.OtpChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          deleteMany: {
            args: Prisma.OtpChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>[]
          }
          upsert: {
            args: Prisma.OtpChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpChallengePayload>
          }
          aggregate: {
            args: Prisma.OtpChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpChallenge>
          }
          groupBy: {
            args: Prisma.OtpChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpChallengeCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetAuthorization: {
        payload: Prisma.$PasswordResetAuthorizationPayload<ExtArgs>
        fields: Prisma.PasswordResetAuthorizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetAuthorizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetAuthorizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetAuthorizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetAuthorizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          findMany: {
            args: Prisma.PasswordResetAuthorizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>[]
          }
          create: {
            args: Prisma.PasswordResetAuthorizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          createMany: {
            args: Prisma.PasswordResetAuthorizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetAuthorizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetAuthorizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          update: {
            args: Prisma.PasswordResetAuthorizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetAuthorizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetAuthorizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetAuthorizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetAuthorizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetAuthorizationPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAuthorizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetAuthorization>
          }
          groupBy: {
            args: Prisma.PasswordResetAuthorizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetAuthorizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetAuthorizationCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetAuthorizationCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      SecurityEvent: {
        payload: Prisma.$SecurityEventPayload<ExtArgs>
        fields: Prisma.SecurityEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          findFirst: {
            args: Prisma.SecurityEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          findMany: {
            args: Prisma.SecurityEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>[]
          }
          create: {
            args: Prisma.SecurityEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          createMany: {
            args: Prisma.SecurityEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>[]
          }
          delete: {
            args: Prisma.SecurityEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          update: {
            args: Prisma.SecurityEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          deleteMany: {
            args: Prisma.SecurityEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecurityEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>[]
          }
          upsert: {
            args: Prisma.SecurityEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityEventPayload>
          }
          aggregate: {
            args: Prisma.SecurityEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityEvent>
          }
          groupBy: {
            args: Prisma.SecurityEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityEventCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    authIdentity?: AuthIdentityOmit
    otpChallenge?: OtpChallengeOmit
    passwordResetAuthorization?: PasswordResetAuthorizationOmit
    session?: SessionOmit
    refreshToken?: RefreshTokenOmit
    securityEvent?: SecurityEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    identities: number
    otpChallenges: number
    passwordResetAuthorizations: number
    sessions: number
    securityEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | UserCountOutputTypeCountIdentitiesArgs
    otpChallenges?: boolean | UserCountOutputTypeCountOtpChallengesArgs
    passwordResetAuthorizations?: boolean | UserCountOutputTypeCountPasswordResetAuthorizationsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    securityEvents?: boolean | UserCountOutputTypeCountSecurityEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthIdentityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOtpChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpChallengeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetAuthorizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetAuthorizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSecurityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityEventWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    refreshTokens: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | SessionCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phoneNumber: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    emailVerifiedAt: Date | null
    phoneNumberVerifiedAt: Date | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    passwordUpdatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phoneNumber: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean | null
    emailVerifiedAt: Date | null
    phoneNumberVerifiedAt: Date | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    passwordUpdatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phoneNumber: number
    passwordHash: number
    firstName: number
    lastName: number
    isActive: number
    emailVerifiedAt: number
    phoneNumberVerifiedAt: number
    failedLoginAttempts: number
    lockedUntil: number
    passwordUpdatedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserSumAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    isActive?: true
    emailVerifiedAt?: true
    phoneNumberVerifiedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordUpdatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    isActive?: true
    emailVerifiedAt?: true
    phoneNumberVerifiedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordUpdatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phoneNumber?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    isActive?: true
    emailVerifiedAt?: true
    phoneNumberVerifiedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordUpdatedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    phoneNumber: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    isActive: boolean
    emailVerifiedAt: Date | null
    phoneNumberVerifiedAt: Date | null
    failedLoginAttempts: number
    lockedUntil: Date | null
    passwordUpdatedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    emailVerifiedAt?: boolean
    phoneNumberVerifiedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordUpdatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    identities?: boolean | User$identitiesArgs<ExtArgs>
    otpChallenges?: boolean | User$otpChallengesArgs<ExtArgs>
    passwordResetAuthorizations?: boolean | User$passwordResetAuthorizationsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    securityEvents?: boolean | User$securityEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    emailVerifiedAt?: boolean
    phoneNumberVerifiedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordUpdatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    emailVerifiedAt?: boolean
    phoneNumberVerifiedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordUpdatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phoneNumber?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    isActive?: boolean
    emailVerifiedAt?: boolean
    phoneNumberVerifiedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordUpdatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phoneNumber" | "passwordHash" | "firstName" | "lastName" | "isActive" | "emailVerifiedAt" | "phoneNumberVerifiedAt" | "failedLoginAttempts" | "lockedUntil" | "passwordUpdatedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    identities?: boolean | User$identitiesArgs<ExtArgs>
    otpChallenges?: boolean | User$otpChallengesArgs<ExtArgs>
    passwordResetAuthorizations?: boolean | User$passwordResetAuthorizationsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    securityEvents?: boolean | User$securityEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      identities: Prisma.$AuthIdentityPayload<ExtArgs>[]
      otpChallenges: Prisma.$OtpChallengePayload<ExtArgs>[]
      passwordResetAuthorizations: Prisma.$PasswordResetAuthorizationPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      securityEvents: Prisma.$SecurityEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      phoneNumber: string | null
      passwordHash: string | null
      firstName: string | null
      lastName: string | null
      isActive: boolean
      emailVerifiedAt: Date | null
      phoneNumberVerifiedAt: Date | null
      failedLoginAttempts: number
      lockedUntil: Date | null
      passwordUpdatedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    identities<T extends User$identitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$identitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    otpChallenges<T extends User$otpChallengesArgs<ExtArgs> = {}>(args?: Subset<T, User$otpChallengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetAuthorizations<T extends User$passwordResetAuthorizationsArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetAuthorizationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    securityEvents<T extends User$securityEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$securityEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly emailVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly phoneNumberVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly failedLoginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly passwordUpdatedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.identities
   */
  export type User$identitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    where?: AuthIdentityWhereInput
    orderBy?: AuthIdentityOrderByWithRelationInput | AuthIdentityOrderByWithRelationInput[]
    cursor?: AuthIdentityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthIdentityScalarFieldEnum | AuthIdentityScalarFieldEnum[]
  }

  /**
   * User.otpChallenges
   */
  export type User$otpChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    where?: OtpChallengeWhereInput
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    cursor?: OtpChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * User.passwordResetAuthorizations
   */
  export type User$passwordResetAuthorizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    where?: PasswordResetAuthorizationWhereInput
    orderBy?: PasswordResetAuthorizationOrderByWithRelationInput | PasswordResetAuthorizationOrderByWithRelationInput[]
    cursor?: PasswordResetAuthorizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetAuthorizationScalarFieldEnum | PasswordResetAuthorizationScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.securityEvents
   */
  export type User$securityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    where?: SecurityEventWhereInput
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    cursor?: SecurityEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AuthIdentity
   */

  export type AggregateAuthIdentity = {
    _count: AuthIdentityCountAggregateOutputType | null
    _min: AuthIdentityMinAggregateOutputType | null
    _max: AuthIdentityMaxAggregateOutputType | null
  }

  export type AuthIdentityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.AuthProvider | null
    providerSubject: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthIdentityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.AuthProvider | null
    providerSubject: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthIdentityCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerSubject: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthIdentityMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerSubject?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthIdentityMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerSubject?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthIdentityCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerSubject?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthIdentityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthIdentity to aggregate.
     */
    where?: AuthIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthIdentities to fetch.
     */
    orderBy?: AuthIdentityOrderByWithRelationInput | AuthIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthIdentities
    **/
    _count?: true | AuthIdentityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthIdentityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthIdentityMaxAggregateInputType
  }

  export type GetAuthIdentityAggregateType<T extends AuthIdentityAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthIdentity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthIdentity[P]>
      : GetScalarType<T[P], AggregateAuthIdentity[P]>
  }




  export type AuthIdentityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthIdentityWhereInput
    orderBy?: AuthIdentityOrderByWithAggregationInput | AuthIdentityOrderByWithAggregationInput[]
    by: AuthIdentityScalarFieldEnum[] | AuthIdentityScalarFieldEnum
    having?: AuthIdentityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthIdentityCountAggregateInputType | true
    _min?: AuthIdentityMinAggregateInputType
    _max?: AuthIdentityMaxAggregateInputType
  }

  export type AuthIdentityGroupByOutputType = {
    id: string
    userId: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email: string | null
    createdAt: Date
    updatedAt: Date
    _count: AuthIdentityCountAggregateOutputType | null
    _min: AuthIdentityMinAggregateOutputType | null
    _max: AuthIdentityMaxAggregateOutputType | null
  }

  type GetAuthIdentityGroupByPayload<T extends AuthIdentityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthIdentityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthIdentityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthIdentityGroupByOutputType[P]>
            : GetScalarType<T[P], AuthIdentityGroupByOutputType[P]>
        }
      >
    >


  export type AuthIdentitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerSubject?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authIdentity"]>

  export type AuthIdentitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerSubject?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authIdentity"]>

  export type AuthIdentitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerSubject?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authIdentity"]>

  export type AuthIdentitySelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerSubject?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthIdentityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerSubject" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["authIdentity"]>
  export type AuthIdentityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthIdentityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthIdentityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthIdentityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthIdentity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: $Enums.AuthProvider
      providerSubject: string
      email: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authIdentity"]>
    composites: {}
  }

  type AuthIdentityGetPayload<S extends boolean | null | undefined | AuthIdentityDefaultArgs> = $Result.GetResult<Prisma.$AuthIdentityPayload, S>

  type AuthIdentityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthIdentityCountAggregateInputType | true
    }

  export interface AuthIdentityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthIdentity'], meta: { name: 'AuthIdentity' } }
    /**
     * Find zero or one AuthIdentity that matches the filter.
     * @param {AuthIdentityFindUniqueArgs} args - Arguments to find a AuthIdentity
     * @example
     * // Get one AuthIdentity
     * const authIdentity = await prisma.authIdentity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthIdentityFindUniqueArgs>(args: SelectSubset<T, AuthIdentityFindUniqueArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthIdentity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthIdentityFindUniqueOrThrowArgs} args - Arguments to find a AuthIdentity
     * @example
     * // Get one AuthIdentity
     * const authIdentity = await prisma.authIdentity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthIdentityFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthIdentity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityFindFirstArgs} args - Arguments to find a AuthIdentity
     * @example
     * // Get one AuthIdentity
     * const authIdentity = await prisma.authIdentity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthIdentityFindFirstArgs>(args?: SelectSubset<T, AuthIdentityFindFirstArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthIdentity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityFindFirstOrThrowArgs} args - Arguments to find a AuthIdentity
     * @example
     * // Get one AuthIdentity
     * const authIdentity = await prisma.authIdentity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthIdentityFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthIdentities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthIdentities
     * const authIdentities = await prisma.authIdentity.findMany()
     * 
     * // Get first 10 AuthIdentities
     * const authIdentities = await prisma.authIdentity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authIdentityWithIdOnly = await prisma.authIdentity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthIdentityFindManyArgs>(args?: SelectSubset<T, AuthIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthIdentity.
     * @param {AuthIdentityCreateArgs} args - Arguments to create a AuthIdentity.
     * @example
     * // Create one AuthIdentity
     * const AuthIdentity = await prisma.authIdentity.create({
     *   data: {
     *     // ... data to create a AuthIdentity
     *   }
     * })
     * 
     */
    create<T extends AuthIdentityCreateArgs>(args: SelectSubset<T, AuthIdentityCreateArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthIdentities.
     * @param {AuthIdentityCreateManyArgs} args - Arguments to create many AuthIdentities.
     * @example
     * // Create many AuthIdentities
     * const authIdentity = await prisma.authIdentity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthIdentityCreateManyArgs>(args?: SelectSubset<T, AuthIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthIdentities and returns the data saved in the database.
     * @param {AuthIdentityCreateManyAndReturnArgs} args - Arguments to create many AuthIdentities.
     * @example
     * // Create many AuthIdentities
     * const authIdentity = await prisma.authIdentity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthIdentities and only return the `id`
     * const authIdentityWithIdOnly = await prisma.authIdentity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthIdentityCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthIdentity.
     * @param {AuthIdentityDeleteArgs} args - Arguments to delete one AuthIdentity.
     * @example
     * // Delete one AuthIdentity
     * const AuthIdentity = await prisma.authIdentity.delete({
     *   where: {
     *     // ... filter to delete one AuthIdentity
     *   }
     * })
     * 
     */
    delete<T extends AuthIdentityDeleteArgs>(args: SelectSubset<T, AuthIdentityDeleteArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthIdentity.
     * @param {AuthIdentityUpdateArgs} args - Arguments to update one AuthIdentity.
     * @example
     * // Update one AuthIdentity
     * const authIdentity = await prisma.authIdentity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthIdentityUpdateArgs>(args: SelectSubset<T, AuthIdentityUpdateArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthIdentities.
     * @param {AuthIdentityDeleteManyArgs} args - Arguments to filter AuthIdentities to delete.
     * @example
     * // Delete a few AuthIdentities
     * const { count } = await prisma.authIdentity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthIdentityDeleteManyArgs>(args?: SelectSubset<T, AuthIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthIdentities
     * const authIdentity = await prisma.authIdentity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthIdentityUpdateManyArgs>(args: SelectSubset<T, AuthIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthIdentities and returns the data updated in the database.
     * @param {AuthIdentityUpdateManyAndReturnArgs} args - Arguments to update many AuthIdentities.
     * @example
     * // Update many AuthIdentities
     * const authIdentity = await prisma.authIdentity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthIdentities and only return the `id`
     * const authIdentityWithIdOnly = await prisma.authIdentity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthIdentityUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthIdentity.
     * @param {AuthIdentityUpsertArgs} args - Arguments to update or create a AuthIdentity.
     * @example
     * // Update or create a AuthIdentity
     * const authIdentity = await prisma.authIdentity.upsert({
     *   create: {
     *     // ... data to create a AuthIdentity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthIdentity we want to update
     *   }
     * })
     */
    upsert<T extends AuthIdentityUpsertArgs>(args: SelectSubset<T, AuthIdentityUpsertArgs<ExtArgs>>): Prisma__AuthIdentityClient<$Result.GetResult<Prisma.$AuthIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityCountArgs} args - Arguments to filter AuthIdentities to count.
     * @example
     * // Count the number of AuthIdentities
     * const count = await prisma.authIdentity.count({
     *   where: {
     *     // ... the filter for the AuthIdentities we want to count
     *   }
     * })
    **/
    count<T extends AuthIdentityCountArgs>(
      args?: Subset<T, AuthIdentityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthIdentityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthIdentityAggregateArgs>(args: Subset<T, AuthIdentityAggregateArgs>): Prisma.PrismaPromise<GetAuthIdentityAggregateType<T>>

    /**
     * Group by AuthIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthIdentityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthIdentityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthIdentityGroupByArgs['orderBy'] }
        : { orderBy?: AuthIdentityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthIdentity model
   */
  readonly fields: AuthIdentityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthIdentity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthIdentityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthIdentity model
   */
  interface AuthIdentityFieldRefs {
    readonly id: FieldRef<"AuthIdentity", 'String'>
    readonly userId: FieldRef<"AuthIdentity", 'String'>
    readonly provider: FieldRef<"AuthIdentity", 'AuthProvider'>
    readonly providerSubject: FieldRef<"AuthIdentity", 'String'>
    readonly email: FieldRef<"AuthIdentity", 'String'>
    readonly createdAt: FieldRef<"AuthIdentity", 'DateTime'>
    readonly updatedAt: FieldRef<"AuthIdentity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthIdentity findUnique
   */
  export type AuthIdentityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter, which AuthIdentity to fetch.
     */
    where: AuthIdentityWhereUniqueInput
  }

  /**
   * AuthIdentity findUniqueOrThrow
   */
  export type AuthIdentityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter, which AuthIdentity to fetch.
     */
    where: AuthIdentityWhereUniqueInput
  }

  /**
   * AuthIdentity findFirst
   */
  export type AuthIdentityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter, which AuthIdentity to fetch.
     */
    where?: AuthIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthIdentities to fetch.
     */
    orderBy?: AuthIdentityOrderByWithRelationInput | AuthIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthIdentities.
     */
    cursor?: AuthIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthIdentities.
     */
    distinct?: AuthIdentityScalarFieldEnum | AuthIdentityScalarFieldEnum[]
  }

  /**
   * AuthIdentity findFirstOrThrow
   */
  export type AuthIdentityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter, which AuthIdentity to fetch.
     */
    where?: AuthIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthIdentities to fetch.
     */
    orderBy?: AuthIdentityOrderByWithRelationInput | AuthIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthIdentities.
     */
    cursor?: AuthIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthIdentities.
     */
    distinct?: AuthIdentityScalarFieldEnum | AuthIdentityScalarFieldEnum[]
  }

  /**
   * AuthIdentity findMany
   */
  export type AuthIdentityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter, which AuthIdentities to fetch.
     */
    where?: AuthIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthIdentities to fetch.
     */
    orderBy?: AuthIdentityOrderByWithRelationInput | AuthIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthIdentities.
     */
    cursor?: AuthIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthIdentities.
     */
    skip?: number
    distinct?: AuthIdentityScalarFieldEnum | AuthIdentityScalarFieldEnum[]
  }

  /**
   * AuthIdentity create
   */
  export type AuthIdentityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthIdentity.
     */
    data: XOR<AuthIdentityCreateInput, AuthIdentityUncheckedCreateInput>
  }

  /**
   * AuthIdentity createMany
   */
  export type AuthIdentityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthIdentities.
     */
    data: AuthIdentityCreateManyInput | AuthIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthIdentity createManyAndReturn
   */
  export type AuthIdentityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * The data used to create many AuthIdentities.
     */
    data: AuthIdentityCreateManyInput | AuthIdentityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthIdentity update
   */
  export type AuthIdentityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthIdentity.
     */
    data: XOR<AuthIdentityUpdateInput, AuthIdentityUncheckedUpdateInput>
    /**
     * Choose, which AuthIdentity to update.
     */
    where: AuthIdentityWhereUniqueInput
  }

  /**
   * AuthIdentity updateMany
   */
  export type AuthIdentityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthIdentities.
     */
    data: XOR<AuthIdentityUpdateManyMutationInput, AuthIdentityUncheckedUpdateManyInput>
    /**
     * Filter which AuthIdentities to update
     */
    where?: AuthIdentityWhereInput
    /**
     * Limit how many AuthIdentities to update.
     */
    limit?: number
  }

  /**
   * AuthIdentity updateManyAndReturn
   */
  export type AuthIdentityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * The data used to update AuthIdentities.
     */
    data: XOR<AuthIdentityUpdateManyMutationInput, AuthIdentityUncheckedUpdateManyInput>
    /**
     * Filter which AuthIdentities to update
     */
    where?: AuthIdentityWhereInput
    /**
     * Limit how many AuthIdentities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthIdentity upsert
   */
  export type AuthIdentityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthIdentity to update in case it exists.
     */
    where: AuthIdentityWhereUniqueInput
    /**
     * In case the AuthIdentity found by the `where` argument doesn't exist, create a new AuthIdentity with this data.
     */
    create: XOR<AuthIdentityCreateInput, AuthIdentityUncheckedCreateInput>
    /**
     * In case the AuthIdentity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthIdentityUpdateInput, AuthIdentityUncheckedUpdateInput>
  }

  /**
   * AuthIdentity delete
   */
  export type AuthIdentityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
    /**
     * Filter which AuthIdentity to delete.
     */
    where: AuthIdentityWhereUniqueInput
  }

  /**
   * AuthIdentity deleteMany
   */
  export type AuthIdentityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthIdentities to delete
     */
    where?: AuthIdentityWhereInput
    /**
     * Limit how many AuthIdentities to delete.
     */
    limit?: number
  }

  /**
   * AuthIdentity without action
   */
  export type AuthIdentityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthIdentity
     */
    select?: AuthIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthIdentity
     */
    omit?: AuthIdentityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthIdentityInclude<ExtArgs> | null
  }


  /**
   * Model OtpChallenge
   */

  export type AggregateOtpChallenge = {
    _count: OtpChallengeCountAggregateOutputType | null
    _avg: OtpChallengeAvgAggregateOutputType | null
    _sum: OtpChallengeSumAggregateOutputType | null
    _min: OtpChallengeMinAggregateOutputType | null
    _max: OtpChallengeMaxAggregateOutputType | null
  }

  export type OtpChallengeAvgAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type OtpChallengeSumAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type OtpChallengeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    expiresAt: Date | null
    attempts: number | null
    maxAttempts: number | null
    consumedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OtpChallengeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    expiresAt: Date | null
    attempts: number | null
    maxAttempts: number | null
    consumedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OtpChallengeCountAggregateOutputType = {
    id: number
    userId: number
    purpose: number
    codeHash: number
    expiresAt: number
    attempts: number
    maxAttempts: number
    consumedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OtpChallengeAvgAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type OtpChallengeSumAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type OtpChallengeMinAggregateInputType = {
    id?: true
    userId?: true
    purpose?: true
    codeHash?: true
    expiresAt?: true
    attempts?: true
    maxAttempts?: true
    consumedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OtpChallengeMaxAggregateInputType = {
    id?: true
    userId?: true
    purpose?: true
    codeHash?: true
    expiresAt?: true
    attempts?: true
    maxAttempts?: true
    consumedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OtpChallengeCountAggregateInputType = {
    id?: true
    userId?: true
    purpose?: true
    codeHash?: true
    expiresAt?: true
    attempts?: true
    maxAttempts?: true
    consumedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OtpChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpChallenge to aggregate.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpChallenges
    **/
    _count?: true | OtpChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpChallengeMaxAggregateInputType
  }

  export type GetOtpChallengeAggregateType<T extends OtpChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpChallenge[P]>
      : GetScalarType<T[P], AggregateOtpChallenge[P]>
  }




  export type OtpChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpChallengeWhereInput
    orderBy?: OtpChallengeOrderByWithAggregationInput | OtpChallengeOrderByWithAggregationInput[]
    by: OtpChallengeScalarFieldEnum[] | OtpChallengeScalarFieldEnum
    having?: OtpChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpChallengeCountAggregateInputType | true
    _avg?: OtpChallengeAvgAggregateInputType
    _sum?: OtpChallengeSumAggregateInputType
    _min?: OtpChallengeMinAggregateInputType
    _max?: OtpChallengeMaxAggregateInputType
  }

  export type OtpChallengeGroupByOutputType = {
    id: string
    userId: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date
    attempts: number
    maxAttempts: number
    consumedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OtpChallengeCountAggregateOutputType | null
    _avg: OtpChallengeAvgAggregateOutputType | null
    _sum: OtpChallengeSumAggregateOutputType | null
    _min: OtpChallengeMinAggregateOutputType | null
    _max: OtpChallengeMaxAggregateOutputType | null
  }

  type GetOtpChallengeGroupByPayload<T extends OtpChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpChallengeGroupByOutputType[P]>
        }
      >
    >


  export type OtpChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    purpose?: boolean
    codeHash?: boolean
    expiresAt?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    purpose?: boolean
    codeHash?: boolean
    expiresAt?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    purpose?: boolean
    codeHash?: boolean
    expiresAt?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpChallenge"]>

  export type OtpChallengeSelectScalar = {
    id?: boolean
    userId?: boolean
    purpose?: boolean
    codeHash?: boolean
    expiresAt?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OtpChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "purpose" | "codeHash" | "expiresAt" | "attempts" | "maxAttempts" | "consumedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["otpChallenge"]>
  export type OtpChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OtpChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OtpChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OtpChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpChallenge"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      purpose: $Enums.OtpPurpose
      codeHash: string
      expiresAt: Date
      attempts: number
      maxAttempts: number
      consumedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["otpChallenge"]>
    composites: {}
  }

  type OtpChallengeGetPayload<S extends boolean | null | undefined | OtpChallengeDefaultArgs> = $Result.GetResult<Prisma.$OtpChallengePayload, S>

  type OtpChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpChallengeCountAggregateInputType | true
    }

  export interface OtpChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpChallenge'], meta: { name: 'OtpChallenge' } }
    /**
     * Find zero or one OtpChallenge that matches the filter.
     * @param {OtpChallengeFindUniqueArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpChallengeFindUniqueArgs>(args: SelectSubset<T, OtpChallengeFindUniqueArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpChallenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpChallengeFindUniqueOrThrowArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindFirstArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpChallengeFindFirstArgs>(args?: SelectSubset<T, OtpChallengeFindFirstArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindFirstOrThrowArgs} args - Arguments to find a OtpChallenge
     * @example
     * // Get one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpChallenges
     * const otpChallenges = await prisma.otpChallenge.findMany()
     * 
     * // Get first 10 OtpChallenges
     * const otpChallenges = await prisma.otpChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpChallengeFindManyArgs>(args?: SelectSubset<T, OtpChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpChallenge.
     * @param {OtpChallengeCreateArgs} args - Arguments to create a OtpChallenge.
     * @example
     * // Create one OtpChallenge
     * const OtpChallenge = await prisma.otpChallenge.create({
     *   data: {
     *     // ... data to create a OtpChallenge
     *   }
     * })
     * 
     */
    create<T extends OtpChallengeCreateArgs>(args: SelectSubset<T, OtpChallengeCreateArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpChallenges.
     * @param {OtpChallengeCreateManyArgs} args - Arguments to create many OtpChallenges.
     * @example
     * // Create many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpChallengeCreateManyArgs>(args?: SelectSubset<T, OtpChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpChallenges and returns the data saved in the database.
     * @param {OtpChallengeCreateManyAndReturnArgs} args - Arguments to create many OtpChallenges.
     * @example
     * // Create many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpChallenges and only return the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpChallenge.
     * @param {OtpChallengeDeleteArgs} args - Arguments to delete one OtpChallenge.
     * @example
     * // Delete one OtpChallenge
     * const OtpChallenge = await prisma.otpChallenge.delete({
     *   where: {
     *     // ... filter to delete one OtpChallenge
     *   }
     * })
     * 
     */
    delete<T extends OtpChallengeDeleteArgs>(args: SelectSubset<T, OtpChallengeDeleteArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpChallenge.
     * @param {OtpChallengeUpdateArgs} args - Arguments to update one OtpChallenge.
     * @example
     * // Update one OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpChallengeUpdateArgs>(args: SelectSubset<T, OtpChallengeUpdateArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpChallenges.
     * @param {OtpChallengeDeleteManyArgs} args - Arguments to filter OtpChallenges to delete.
     * @example
     * // Delete a few OtpChallenges
     * const { count } = await prisma.otpChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpChallengeDeleteManyArgs>(args?: SelectSubset<T, OtpChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpChallengeUpdateManyArgs>(args: SelectSubset<T, OtpChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpChallenges and returns the data updated in the database.
     * @param {OtpChallengeUpdateManyAndReturnArgs} args - Arguments to update many OtpChallenges.
     * @example
     * // Update many OtpChallenges
     * const otpChallenge = await prisma.otpChallenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpChallenges and only return the `id`
     * const otpChallengeWithIdOnly = await prisma.otpChallenge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpChallenge.
     * @param {OtpChallengeUpsertArgs} args - Arguments to update or create a OtpChallenge.
     * @example
     * // Update or create a OtpChallenge
     * const otpChallenge = await prisma.otpChallenge.upsert({
     *   create: {
     *     // ... data to create a OtpChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpChallenge we want to update
     *   }
     * })
     */
    upsert<T extends OtpChallengeUpsertArgs>(args: SelectSubset<T, OtpChallengeUpsertArgs<ExtArgs>>): Prisma__OtpChallengeClient<$Result.GetResult<Prisma.$OtpChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeCountArgs} args - Arguments to filter OtpChallenges to count.
     * @example
     * // Count the number of OtpChallenges
     * const count = await prisma.otpChallenge.count({
     *   where: {
     *     // ... the filter for the OtpChallenges we want to count
     *   }
     * })
    **/
    count<T extends OtpChallengeCountArgs>(
      args?: Subset<T, OtpChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpChallengeAggregateArgs>(args: Subset<T, OtpChallengeAggregateArgs>): Prisma.PrismaPromise<GetOtpChallengeAggregateType<T>>

    /**
     * Group by OtpChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpChallengeGroupByArgs['orderBy'] }
        : { orderBy?: OtpChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpChallenge model
   */
  readonly fields: OtpChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpChallenge model
   */
  interface OtpChallengeFieldRefs {
    readonly id: FieldRef<"OtpChallenge", 'String'>
    readonly userId: FieldRef<"OtpChallenge", 'String'>
    readonly purpose: FieldRef<"OtpChallenge", 'OtpPurpose'>
    readonly codeHash: FieldRef<"OtpChallenge", 'String'>
    readonly expiresAt: FieldRef<"OtpChallenge", 'DateTime'>
    readonly attempts: FieldRef<"OtpChallenge", 'Int'>
    readonly maxAttempts: FieldRef<"OtpChallenge", 'Int'>
    readonly consumedAt: FieldRef<"OtpChallenge", 'DateTime'>
    readonly createdAt: FieldRef<"OtpChallenge", 'DateTime'>
    readonly updatedAt: FieldRef<"OtpChallenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpChallenge findUnique
   */
  export type OtpChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge findUniqueOrThrow
   */
  export type OtpChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge findFirst
   */
  export type OtpChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpChallenges.
     */
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge findFirstOrThrow
   */
  export type OtpChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter, which OtpChallenge to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpChallenges.
     */
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge findMany
   */
  export type OtpChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter, which OtpChallenges to fetch.
     */
    where?: OtpChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpChallenges to fetch.
     */
    orderBy?: OtpChallengeOrderByWithRelationInput | OtpChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpChallenges.
     */
    cursor?: OtpChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpChallenges.
     */
    skip?: number
    distinct?: OtpChallengeScalarFieldEnum | OtpChallengeScalarFieldEnum[]
  }

  /**
   * OtpChallenge create
   */
  export type OtpChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a OtpChallenge.
     */
    data: XOR<OtpChallengeCreateInput, OtpChallengeUncheckedCreateInput>
  }

  /**
   * OtpChallenge createMany
   */
  export type OtpChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpChallenges.
     */
    data: OtpChallengeCreateManyInput | OtpChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpChallenge createManyAndReturn
   */
  export type OtpChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpChallenges.
     */
    data: OtpChallengeCreateManyInput | OtpChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpChallenge update
   */
  export type OtpChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a OtpChallenge.
     */
    data: XOR<OtpChallengeUpdateInput, OtpChallengeUncheckedUpdateInput>
    /**
     * Choose, which OtpChallenge to update.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge updateMany
   */
  export type OtpChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpChallenges.
     */
    data: XOR<OtpChallengeUpdateManyMutationInput, OtpChallengeUncheckedUpdateManyInput>
    /**
     * Filter which OtpChallenges to update
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to update.
     */
    limit?: number
  }

  /**
   * OtpChallenge updateManyAndReturn
   */
  export type OtpChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * The data used to update OtpChallenges.
     */
    data: XOR<OtpChallengeUpdateManyMutationInput, OtpChallengeUncheckedUpdateManyInput>
    /**
     * Filter which OtpChallenges to update
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpChallenge upsert
   */
  export type OtpChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the OtpChallenge to update in case it exists.
     */
    where: OtpChallengeWhereUniqueInput
    /**
     * In case the OtpChallenge found by the `where` argument doesn't exist, create a new OtpChallenge with this data.
     */
    create: XOR<OtpChallengeCreateInput, OtpChallengeUncheckedCreateInput>
    /**
     * In case the OtpChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpChallengeUpdateInput, OtpChallengeUncheckedUpdateInput>
  }

  /**
   * OtpChallenge delete
   */
  export type OtpChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
    /**
     * Filter which OtpChallenge to delete.
     */
    where: OtpChallengeWhereUniqueInput
  }

  /**
   * OtpChallenge deleteMany
   */
  export type OtpChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpChallenges to delete
     */
    where?: OtpChallengeWhereInput
    /**
     * Limit how many OtpChallenges to delete.
     */
    limit?: number
  }

  /**
   * OtpChallenge without action
   */
  export type OtpChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpChallenge
     */
    select?: OtpChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpChallenge
     */
    omit?: OtpChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpChallengeInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetAuthorization
   */

  export type AggregatePasswordResetAuthorization = {
    _count: PasswordResetAuthorizationCountAggregateOutputType | null
    _min: PasswordResetAuthorizationMinAggregateOutputType | null
    _max: PasswordResetAuthorizationMaxAggregateOutputType | null
  }

  export type PasswordResetAuthorizationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetAuthorizationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetAuthorizationCountAggregateOutputType = {
    id: number
    userId: number
    tokenHash: number
    expiresAt: number
    consumedAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetAuthorizationMinAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type PasswordResetAuthorizationMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type PasswordResetAuthorizationCountAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetAuthorizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetAuthorization to aggregate.
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetAuthorizations to fetch.
     */
    orderBy?: PasswordResetAuthorizationOrderByWithRelationInput | PasswordResetAuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetAuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetAuthorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetAuthorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetAuthorizations
    **/
    _count?: true | PasswordResetAuthorizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetAuthorizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetAuthorizationMaxAggregateInputType
  }

  export type GetPasswordResetAuthorizationAggregateType<T extends PasswordResetAuthorizationAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetAuthorization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetAuthorization[P]>
      : GetScalarType<T[P], AggregatePasswordResetAuthorization[P]>
  }




  export type PasswordResetAuthorizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetAuthorizationWhereInput
    orderBy?: PasswordResetAuthorizationOrderByWithAggregationInput | PasswordResetAuthorizationOrderByWithAggregationInput[]
    by: PasswordResetAuthorizationScalarFieldEnum[] | PasswordResetAuthorizationScalarFieldEnum
    having?: PasswordResetAuthorizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetAuthorizationCountAggregateInputType | true
    _min?: PasswordResetAuthorizationMinAggregateInputType
    _max?: PasswordResetAuthorizationMaxAggregateInputType
  }

  export type PasswordResetAuthorizationGroupByOutputType = {
    id: string
    userId: string
    tokenHash: string
    expiresAt: Date
    consumedAt: Date | null
    createdAt: Date
    _count: PasswordResetAuthorizationCountAggregateOutputType | null
    _min: PasswordResetAuthorizationMinAggregateOutputType | null
    _max: PasswordResetAuthorizationMaxAggregateOutputType | null
  }

  type GetPasswordResetAuthorizationGroupByPayload<T extends PasswordResetAuthorizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetAuthorizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetAuthorizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetAuthorizationGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetAuthorizationGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetAuthorizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetAuthorization"]>

  export type PasswordResetAuthorizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetAuthorization"]>

  export type PasswordResetAuthorizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetAuthorization"]>

  export type PasswordResetAuthorizationSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetAuthorizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tokenHash" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["passwordResetAuthorization"]>
  export type PasswordResetAuthorizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetAuthorizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetAuthorizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetAuthorizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetAuthorization"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenHash: string
      expiresAt: Date
      consumedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["passwordResetAuthorization"]>
    composites: {}
  }

  type PasswordResetAuthorizationGetPayload<S extends boolean | null | undefined | PasswordResetAuthorizationDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetAuthorizationPayload, S>

  type PasswordResetAuthorizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetAuthorizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetAuthorizationCountAggregateInputType | true
    }

  export interface PasswordResetAuthorizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetAuthorization'], meta: { name: 'PasswordResetAuthorization' } }
    /**
     * Find zero or one PasswordResetAuthorization that matches the filter.
     * @param {PasswordResetAuthorizationFindUniqueArgs} args - Arguments to find a PasswordResetAuthorization
     * @example
     * // Get one PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetAuthorizationFindUniqueArgs>(args: SelectSubset<T, PasswordResetAuthorizationFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetAuthorization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetAuthorizationFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetAuthorization
     * @example
     * // Get one PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetAuthorizationFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetAuthorizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetAuthorization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationFindFirstArgs} args - Arguments to find a PasswordResetAuthorization
     * @example
     * // Get one PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetAuthorizationFindFirstArgs>(args?: SelectSubset<T, PasswordResetAuthorizationFindFirstArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetAuthorization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationFindFirstOrThrowArgs} args - Arguments to find a PasswordResetAuthorization
     * @example
     * // Get one PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetAuthorizationFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetAuthorizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetAuthorizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetAuthorizations
     * const passwordResetAuthorizations = await prisma.passwordResetAuthorization.findMany()
     * 
     * // Get first 10 PasswordResetAuthorizations
     * const passwordResetAuthorizations = await prisma.passwordResetAuthorization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetAuthorizationWithIdOnly = await prisma.passwordResetAuthorization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetAuthorizationFindManyArgs>(args?: SelectSubset<T, PasswordResetAuthorizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetAuthorization.
     * @param {PasswordResetAuthorizationCreateArgs} args - Arguments to create a PasswordResetAuthorization.
     * @example
     * // Create one PasswordResetAuthorization
     * const PasswordResetAuthorization = await prisma.passwordResetAuthorization.create({
     *   data: {
     *     // ... data to create a PasswordResetAuthorization
     *   }
     * })
     * 
     */
    create<T extends PasswordResetAuthorizationCreateArgs>(args: SelectSubset<T, PasswordResetAuthorizationCreateArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetAuthorizations.
     * @param {PasswordResetAuthorizationCreateManyArgs} args - Arguments to create many PasswordResetAuthorizations.
     * @example
     * // Create many PasswordResetAuthorizations
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetAuthorizationCreateManyArgs>(args?: SelectSubset<T, PasswordResetAuthorizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetAuthorizations and returns the data saved in the database.
     * @param {PasswordResetAuthorizationCreateManyAndReturnArgs} args - Arguments to create many PasswordResetAuthorizations.
     * @example
     * // Create many PasswordResetAuthorizations
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetAuthorizations and only return the `id`
     * const passwordResetAuthorizationWithIdOnly = await prisma.passwordResetAuthorization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetAuthorizationCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetAuthorizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetAuthorization.
     * @param {PasswordResetAuthorizationDeleteArgs} args - Arguments to delete one PasswordResetAuthorization.
     * @example
     * // Delete one PasswordResetAuthorization
     * const PasswordResetAuthorization = await prisma.passwordResetAuthorization.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetAuthorization
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetAuthorizationDeleteArgs>(args: SelectSubset<T, PasswordResetAuthorizationDeleteArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetAuthorization.
     * @param {PasswordResetAuthorizationUpdateArgs} args - Arguments to update one PasswordResetAuthorization.
     * @example
     * // Update one PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetAuthorizationUpdateArgs>(args: SelectSubset<T, PasswordResetAuthorizationUpdateArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetAuthorizations.
     * @param {PasswordResetAuthorizationDeleteManyArgs} args - Arguments to filter PasswordResetAuthorizations to delete.
     * @example
     * // Delete a few PasswordResetAuthorizations
     * const { count } = await prisma.passwordResetAuthorization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetAuthorizationDeleteManyArgs>(args?: SelectSubset<T, PasswordResetAuthorizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetAuthorizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetAuthorizations
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetAuthorizationUpdateManyArgs>(args: SelectSubset<T, PasswordResetAuthorizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetAuthorizations and returns the data updated in the database.
     * @param {PasswordResetAuthorizationUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetAuthorizations.
     * @example
     * // Update many PasswordResetAuthorizations
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetAuthorizations and only return the `id`
     * const passwordResetAuthorizationWithIdOnly = await prisma.passwordResetAuthorization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetAuthorizationUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetAuthorizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetAuthorization.
     * @param {PasswordResetAuthorizationUpsertArgs} args - Arguments to update or create a PasswordResetAuthorization.
     * @example
     * // Update or create a PasswordResetAuthorization
     * const passwordResetAuthorization = await prisma.passwordResetAuthorization.upsert({
     *   create: {
     *     // ... data to create a PasswordResetAuthorization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetAuthorization we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetAuthorizationUpsertArgs>(args: SelectSubset<T, PasswordResetAuthorizationUpsertArgs<ExtArgs>>): Prisma__PasswordResetAuthorizationClient<$Result.GetResult<Prisma.$PasswordResetAuthorizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetAuthorizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationCountArgs} args - Arguments to filter PasswordResetAuthorizations to count.
     * @example
     * // Count the number of PasswordResetAuthorizations
     * const count = await prisma.passwordResetAuthorization.count({
     *   where: {
     *     // ... the filter for the PasswordResetAuthorizations we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetAuthorizationCountArgs>(
      args?: Subset<T, PasswordResetAuthorizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetAuthorizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetAuthorization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetAuthorizationAggregateArgs>(args: Subset<T, PasswordResetAuthorizationAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAuthorizationAggregateType<T>>

    /**
     * Group by PasswordResetAuthorization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAuthorizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetAuthorizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetAuthorizationGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetAuthorizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetAuthorizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetAuthorizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetAuthorization model
   */
  readonly fields: PasswordResetAuthorizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetAuthorization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetAuthorizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetAuthorization model
   */
  interface PasswordResetAuthorizationFieldRefs {
    readonly id: FieldRef<"PasswordResetAuthorization", 'String'>
    readonly userId: FieldRef<"PasswordResetAuthorization", 'String'>
    readonly tokenHash: FieldRef<"PasswordResetAuthorization", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetAuthorization", 'DateTime'>
    readonly consumedAt: FieldRef<"PasswordResetAuthorization", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetAuthorization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetAuthorization findUnique
   */
  export type PasswordResetAuthorizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetAuthorization to fetch.
     */
    where: PasswordResetAuthorizationWhereUniqueInput
  }

  /**
   * PasswordResetAuthorization findUniqueOrThrow
   */
  export type PasswordResetAuthorizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetAuthorization to fetch.
     */
    where: PasswordResetAuthorizationWhereUniqueInput
  }

  /**
   * PasswordResetAuthorization findFirst
   */
  export type PasswordResetAuthorizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetAuthorization to fetch.
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetAuthorizations to fetch.
     */
    orderBy?: PasswordResetAuthorizationOrderByWithRelationInput | PasswordResetAuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetAuthorizations.
     */
    cursor?: PasswordResetAuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetAuthorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetAuthorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetAuthorizations.
     */
    distinct?: PasswordResetAuthorizationScalarFieldEnum | PasswordResetAuthorizationScalarFieldEnum[]
  }

  /**
   * PasswordResetAuthorization findFirstOrThrow
   */
  export type PasswordResetAuthorizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetAuthorization to fetch.
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetAuthorizations to fetch.
     */
    orderBy?: PasswordResetAuthorizationOrderByWithRelationInput | PasswordResetAuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetAuthorizations.
     */
    cursor?: PasswordResetAuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetAuthorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetAuthorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetAuthorizations.
     */
    distinct?: PasswordResetAuthorizationScalarFieldEnum | PasswordResetAuthorizationScalarFieldEnum[]
  }

  /**
   * PasswordResetAuthorization findMany
   */
  export type PasswordResetAuthorizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetAuthorizations to fetch.
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetAuthorizations to fetch.
     */
    orderBy?: PasswordResetAuthorizationOrderByWithRelationInput | PasswordResetAuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetAuthorizations.
     */
    cursor?: PasswordResetAuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetAuthorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetAuthorizations.
     */
    skip?: number
    distinct?: PasswordResetAuthorizationScalarFieldEnum | PasswordResetAuthorizationScalarFieldEnum[]
  }

  /**
   * PasswordResetAuthorization create
   */
  export type PasswordResetAuthorizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetAuthorization.
     */
    data: XOR<PasswordResetAuthorizationCreateInput, PasswordResetAuthorizationUncheckedCreateInput>
  }

  /**
   * PasswordResetAuthorization createMany
   */
  export type PasswordResetAuthorizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetAuthorizations.
     */
    data: PasswordResetAuthorizationCreateManyInput | PasswordResetAuthorizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetAuthorization createManyAndReturn
   */
  export type PasswordResetAuthorizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetAuthorizations.
     */
    data: PasswordResetAuthorizationCreateManyInput | PasswordResetAuthorizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetAuthorization update
   */
  export type PasswordResetAuthorizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetAuthorization.
     */
    data: XOR<PasswordResetAuthorizationUpdateInput, PasswordResetAuthorizationUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetAuthorization to update.
     */
    where: PasswordResetAuthorizationWhereUniqueInput
  }

  /**
   * PasswordResetAuthorization updateMany
   */
  export type PasswordResetAuthorizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetAuthorizations.
     */
    data: XOR<PasswordResetAuthorizationUpdateManyMutationInput, PasswordResetAuthorizationUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetAuthorizations to update
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * Limit how many PasswordResetAuthorizations to update.
     */
    limit?: number
  }

  /**
   * PasswordResetAuthorization updateManyAndReturn
   */
  export type PasswordResetAuthorizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetAuthorizations.
     */
    data: XOR<PasswordResetAuthorizationUpdateManyMutationInput, PasswordResetAuthorizationUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetAuthorizations to update
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * Limit how many PasswordResetAuthorizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetAuthorization upsert
   */
  export type PasswordResetAuthorizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetAuthorization to update in case it exists.
     */
    where: PasswordResetAuthorizationWhereUniqueInput
    /**
     * In case the PasswordResetAuthorization found by the `where` argument doesn't exist, create a new PasswordResetAuthorization with this data.
     */
    create: XOR<PasswordResetAuthorizationCreateInput, PasswordResetAuthorizationUncheckedCreateInput>
    /**
     * In case the PasswordResetAuthorization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetAuthorizationUpdateInput, PasswordResetAuthorizationUncheckedUpdateInput>
  }

  /**
   * PasswordResetAuthorization delete
   */
  export type PasswordResetAuthorizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetAuthorization to delete.
     */
    where: PasswordResetAuthorizationWhereUniqueInput
  }

  /**
   * PasswordResetAuthorization deleteMany
   */
  export type PasswordResetAuthorizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetAuthorizations to delete
     */
    where?: PasswordResetAuthorizationWhereInput
    /**
     * Limit how many PasswordResetAuthorizations to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetAuthorization without action
   */
  export type PasswordResetAuthorizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetAuthorization
     */
    select?: PasswordResetAuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetAuthorization
     */
    omit?: PasswordResetAuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetAuthorizationInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    ipAddress: string | null
    userAgent: string | null
    lastUsedAt: Date | null
    revocationReason: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    ipAddress: string | null
    userAgent: string | null
    lastUsedAt: Date | null
    revocationReason: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    ipAddress: number
    userAgent: number
    lastUsedAt: number
    revocationReason: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    lastUsedAt?: true
    revocationReason?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    lastUsedAt?: true
    revocationReason?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    ipAddress?: true
    userAgent?: true
    lastUsedAt?: true
    revocationReason?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    ipAddress: string | null
    userAgent: string | null
    lastUsedAt: Date
    revocationReason: string | null
    expiresAt: Date
    revokedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    lastUsedAt?: boolean
    revocationReason?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Session$refreshTokensArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    lastUsedAt?: boolean
    revocationReason?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    lastUsedAt?: boolean
    revocationReason?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    lastUsedAt?: boolean
    revocationReason?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "ipAddress" | "userAgent" | "lastUsedAt" | "revocationReason" | "expiresAt" | "revokedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Session$refreshTokensArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      ipAddress: string | null
      userAgent: string | null
      lastUsedAt: Date
      revocationReason: string | null
      expiresAt: Date
      revokedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    refreshTokens<T extends Session$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, Session$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly lastUsedAt: FieldRef<"Session", 'DateTime'>
    readonly revocationReason: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly revokedAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.refreshTokens
   */
  export type Session$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    familyId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    revokedAt: Date | null
    replacedByTokenId: string | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    familyId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    revokedAt: Date | null
    replacedByTokenId: string | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    sessionId: number
    familyId: number
    tokenHash: number
    expiresAt: number
    consumedAt: number
    revokedAt: number
    replacedByTokenId: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    sessionId?: true
    familyId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    revokedAt?: true
    replacedByTokenId?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    sessionId?: true
    familyId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    revokedAt?: true
    replacedByTokenId?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    sessionId?: true
    familyId?: true
    tokenHash?: true
    expiresAt?: true
    consumedAt?: true
    revokedAt?: true
    replacedByTokenId?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    sessionId: string
    familyId: string
    tokenHash: string
    expiresAt: Date
    consumedAt: Date | null
    revokedAt: Date | null
    replacedByTokenId: string | null
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    familyId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    revokedAt?: boolean
    replacedByTokenId?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    familyId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    revokedAt?: boolean
    replacedByTokenId?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    familyId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    revokedAt?: boolean
    replacedByTokenId?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    sessionId?: boolean
    familyId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    revokedAt?: boolean
    replacedByTokenId?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "familyId" | "tokenHash" | "expiresAt" | "consumedAt" | "revokedAt" | "replacedByTokenId" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      familyId: string
      tokenHash: string
      expiresAt: Date
      consumedAt: Date | null
      revokedAt: Date | null
      replacedByTokenId: string | null
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly sessionId: FieldRef<"RefreshToken", 'String'>
    readonly familyId: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly consumedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly replacedByTokenId: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model SecurityEvent
   */

  export type AggregateSecurityEvent = {
    _count: SecurityEventCountAggregateOutputType | null
    _min: SecurityEventMinAggregateOutputType | null
    _max: SecurityEventMaxAggregateOutputType | null
  }

  export type SecurityEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.SecurityEventType | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SecurityEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.SecurityEventType | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SecurityEventCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    ipAddress: number
    userAgent: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type SecurityEventMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SecurityEventMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SecurityEventCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type SecurityEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityEvent to aggregate.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityEvents
    **/
    _count?: true | SecurityEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityEventMaxAggregateInputType
  }

  export type GetSecurityEventAggregateType<T extends SecurityEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityEvent[P]>
      : GetScalarType<T[P], AggregateSecurityEvent[P]>
  }




  export type SecurityEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityEventWhereInput
    orderBy?: SecurityEventOrderByWithAggregationInput | SecurityEventOrderByWithAggregationInput[]
    by: SecurityEventScalarFieldEnum[] | SecurityEventScalarFieldEnum
    having?: SecurityEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityEventCountAggregateInputType | true
    _min?: SecurityEventMinAggregateInputType
    _max?: SecurityEventMaxAggregateInputType
  }

  export type SecurityEventGroupByOutputType = {
    id: string
    userId: string | null
    type: $Enums.SecurityEventType
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: SecurityEventCountAggregateOutputType | null
    _min: SecurityEventMinAggregateOutputType | null
    _max: SecurityEventMaxAggregateOutputType | null
  }

  type GetSecurityEventGroupByPayload<T extends SecurityEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityEventGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityEventGroupByOutputType[P]>
        }
      >
    >


  export type SecurityEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }, ExtArgs["result"]["securityEvent"]>

  export type SecurityEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }, ExtArgs["result"]["securityEvent"]>

  export type SecurityEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }, ExtArgs["result"]["securityEvent"]>

  export type SecurityEventSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type SecurityEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "ipAddress" | "userAgent" | "metadata" | "createdAt", ExtArgs["result"]["securityEvent"]>
  export type SecurityEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }
  export type SecurityEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }
  export type SecurityEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SecurityEvent$userArgs<ExtArgs>
  }

  export type $SecurityEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      type: $Enums.SecurityEventType
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["securityEvent"]>
    composites: {}
  }

  type SecurityEventGetPayload<S extends boolean | null | undefined | SecurityEventDefaultArgs> = $Result.GetResult<Prisma.$SecurityEventPayload, S>

  type SecurityEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecurityEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecurityEventCountAggregateInputType | true
    }

  export interface SecurityEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityEvent'], meta: { name: 'SecurityEvent' } }
    /**
     * Find zero or one SecurityEvent that matches the filter.
     * @param {SecurityEventFindUniqueArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityEventFindUniqueArgs>(args: SelectSubset<T, SecurityEventFindUniqueArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SecurityEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecurityEventFindUniqueOrThrowArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindFirstArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityEventFindFirstArgs>(args?: SelectSubset<T, SecurityEventFindFirstArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindFirstOrThrowArgs} args - Arguments to find a SecurityEvent
     * @example
     * // Get one SecurityEvent
     * const securityEvent = await prisma.securityEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SecurityEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityEvents
     * const securityEvents = await prisma.securityEvent.findMany()
     * 
     * // Get first 10 SecurityEvents
     * const securityEvents = await prisma.securityEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityEventWithIdOnly = await prisma.securityEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityEventFindManyArgs>(args?: SelectSubset<T, SecurityEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SecurityEvent.
     * @param {SecurityEventCreateArgs} args - Arguments to create a SecurityEvent.
     * @example
     * // Create one SecurityEvent
     * const SecurityEvent = await prisma.securityEvent.create({
     *   data: {
     *     // ... data to create a SecurityEvent
     *   }
     * })
     * 
     */
    create<T extends SecurityEventCreateArgs>(args: SelectSubset<T, SecurityEventCreateArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SecurityEvents.
     * @param {SecurityEventCreateManyArgs} args - Arguments to create many SecurityEvents.
     * @example
     * // Create many SecurityEvents
     * const securityEvent = await prisma.securityEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityEventCreateManyArgs>(args?: SelectSubset<T, SecurityEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityEvents and returns the data saved in the database.
     * @param {SecurityEventCreateManyAndReturnArgs} args - Arguments to create many SecurityEvents.
     * @example
     * // Create many SecurityEvents
     * const securityEvent = await prisma.securityEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityEvents and only return the `id`
     * const securityEventWithIdOnly = await prisma.securityEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SecurityEvent.
     * @param {SecurityEventDeleteArgs} args - Arguments to delete one SecurityEvent.
     * @example
     * // Delete one SecurityEvent
     * const SecurityEvent = await prisma.securityEvent.delete({
     *   where: {
     *     // ... filter to delete one SecurityEvent
     *   }
     * })
     * 
     */
    delete<T extends SecurityEventDeleteArgs>(args: SelectSubset<T, SecurityEventDeleteArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SecurityEvent.
     * @param {SecurityEventUpdateArgs} args - Arguments to update one SecurityEvent.
     * @example
     * // Update one SecurityEvent
     * const securityEvent = await prisma.securityEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityEventUpdateArgs>(args: SelectSubset<T, SecurityEventUpdateArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SecurityEvents.
     * @param {SecurityEventDeleteManyArgs} args - Arguments to filter SecurityEvents to delete.
     * @example
     * // Delete a few SecurityEvents
     * const { count } = await prisma.securityEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityEventDeleteManyArgs>(args?: SelectSubset<T, SecurityEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityEvents
     * const securityEvent = await prisma.securityEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityEventUpdateManyArgs>(args: SelectSubset<T, SecurityEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityEvents and returns the data updated in the database.
     * @param {SecurityEventUpdateManyAndReturnArgs} args - Arguments to update many SecurityEvents.
     * @example
     * // Update many SecurityEvents
     * const securityEvent = await prisma.securityEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SecurityEvents and only return the `id`
     * const securityEventWithIdOnly = await prisma.securityEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SecurityEventUpdateManyAndReturnArgs>(args: SelectSubset<T, SecurityEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SecurityEvent.
     * @param {SecurityEventUpsertArgs} args - Arguments to update or create a SecurityEvent.
     * @example
     * // Update or create a SecurityEvent
     * const securityEvent = await prisma.securityEvent.upsert({
     *   create: {
     *     // ... data to create a SecurityEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityEvent we want to update
     *   }
     * })
     */
    upsert<T extends SecurityEventUpsertArgs>(args: SelectSubset<T, SecurityEventUpsertArgs<ExtArgs>>): Prisma__SecurityEventClient<$Result.GetResult<Prisma.$SecurityEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SecurityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventCountArgs} args - Arguments to filter SecurityEvents to count.
     * @example
     * // Count the number of SecurityEvents
     * const count = await prisma.securityEvent.count({
     *   where: {
     *     // ... the filter for the SecurityEvents we want to count
     *   }
     * })
    **/
    count<T extends SecurityEventCountArgs>(
      args?: Subset<T, SecurityEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityEventAggregateArgs>(args: Subset<T, SecurityEventAggregateArgs>): Prisma.PrismaPromise<GetSecurityEventAggregateType<T>>

    /**
     * Group by SecurityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityEventGroupByArgs['orderBy'] }
        : { orderBy?: SecurityEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityEvent model
   */
  readonly fields: SecurityEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends SecurityEvent$userArgs<ExtArgs> = {}>(args?: Subset<T, SecurityEvent$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SecurityEvent model
   */
  interface SecurityEventFieldRefs {
    readonly id: FieldRef<"SecurityEvent", 'String'>
    readonly userId: FieldRef<"SecurityEvent", 'String'>
    readonly type: FieldRef<"SecurityEvent", 'SecurityEventType'>
    readonly ipAddress: FieldRef<"SecurityEvent", 'String'>
    readonly userAgent: FieldRef<"SecurityEvent", 'String'>
    readonly metadata: FieldRef<"SecurityEvent", 'Json'>
    readonly createdAt: FieldRef<"SecurityEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityEvent findUnique
   */
  export type SecurityEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent findUniqueOrThrow
   */
  export type SecurityEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent findFirst
   */
  export type SecurityEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityEvents.
     */
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent findFirstOrThrow
   */
  export type SecurityEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter, which SecurityEvent to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityEvents.
     */
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent findMany
   */
  export type SecurityEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter, which SecurityEvents to fetch.
     */
    where?: SecurityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityEvents to fetch.
     */
    orderBy?: SecurityEventOrderByWithRelationInput | SecurityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityEvents.
     */
    cursor?: SecurityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityEvents.
     */
    skip?: number
    distinct?: SecurityEventScalarFieldEnum | SecurityEventScalarFieldEnum[]
  }

  /**
   * SecurityEvent create
   */
  export type SecurityEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * The data needed to create a SecurityEvent.
     */
    data: XOR<SecurityEventCreateInput, SecurityEventUncheckedCreateInput>
  }

  /**
   * SecurityEvent createMany
   */
  export type SecurityEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityEvents.
     */
    data: SecurityEventCreateManyInput | SecurityEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityEvent createManyAndReturn
   */
  export type SecurityEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * The data used to create many SecurityEvents.
     */
    data: SecurityEventCreateManyInput | SecurityEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SecurityEvent update
   */
  export type SecurityEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * The data needed to update a SecurityEvent.
     */
    data: XOR<SecurityEventUpdateInput, SecurityEventUncheckedUpdateInput>
    /**
     * Choose, which SecurityEvent to update.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent updateMany
   */
  export type SecurityEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityEvents.
     */
    data: XOR<SecurityEventUpdateManyMutationInput, SecurityEventUncheckedUpdateManyInput>
    /**
     * Filter which SecurityEvents to update
     */
    where?: SecurityEventWhereInput
    /**
     * Limit how many SecurityEvents to update.
     */
    limit?: number
  }

  /**
   * SecurityEvent updateManyAndReturn
   */
  export type SecurityEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * The data used to update SecurityEvents.
     */
    data: XOR<SecurityEventUpdateManyMutationInput, SecurityEventUncheckedUpdateManyInput>
    /**
     * Filter which SecurityEvents to update
     */
    where?: SecurityEventWhereInput
    /**
     * Limit how many SecurityEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SecurityEvent upsert
   */
  export type SecurityEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * The filter to search for the SecurityEvent to update in case it exists.
     */
    where: SecurityEventWhereUniqueInput
    /**
     * In case the SecurityEvent found by the `where` argument doesn't exist, create a new SecurityEvent with this data.
     */
    create: XOR<SecurityEventCreateInput, SecurityEventUncheckedCreateInput>
    /**
     * In case the SecurityEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityEventUpdateInput, SecurityEventUncheckedUpdateInput>
  }

  /**
   * SecurityEvent delete
   */
  export type SecurityEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
    /**
     * Filter which SecurityEvent to delete.
     */
    where: SecurityEventWhereUniqueInput
  }

  /**
   * SecurityEvent deleteMany
   */
  export type SecurityEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityEvents to delete
     */
    where?: SecurityEventWhereInput
    /**
     * Limit how many SecurityEvents to delete.
     */
    limit?: number
  }

  /**
   * SecurityEvent.user
   */
  export type SecurityEvent$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SecurityEvent without action
   */
  export type SecurityEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityEvent
     */
    select?: SecurityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityEvent
     */
    omit?: SecurityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phoneNumber: 'phoneNumber',
    passwordHash: 'passwordHash',
    firstName: 'firstName',
    lastName: 'lastName',
    isActive: 'isActive',
    emailVerifiedAt: 'emailVerifiedAt',
    phoneNumberVerifiedAt: 'phoneNumberVerifiedAt',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    passwordUpdatedAt: 'passwordUpdatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthIdentityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerSubject: 'providerSubject',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthIdentityScalarFieldEnum = (typeof AuthIdentityScalarFieldEnum)[keyof typeof AuthIdentityScalarFieldEnum]


  export const OtpChallengeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    purpose: 'purpose',
    codeHash: 'codeHash',
    expiresAt: 'expiresAt',
    attempts: 'attempts',
    maxAttempts: 'maxAttempts',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OtpChallengeScalarFieldEnum = (typeof OtpChallengeScalarFieldEnum)[keyof typeof OtpChallengeScalarFieldEnum]


  export const PasswordResetAuthorizationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetAuthorizationScalarFieldEnum = (typeof PasswordResetAuthorizationScalarFieldEnum)[keyof typeof PasswordResetAuthorizationScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    lastUsedAt: 'lastUsedAt',
    revocationReason: 'revocationReason',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    familyId: 'familyId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    revokedAt: 'revokedAt',
    replacedByTokenId: 'replacedByTokenId',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SecurityEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type SecurityEventScalarFieldEnum = (typeof SecurityEventScalarFieldEnum)[keyof typeof SecurityEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AuthProvider'
   */
  export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>
    


  /**
   * Reference to a field of type 'AuthProvider[]'
   */
  export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>
    


  /**
   * Reference to a field of type 'OtpPurpose'
   */
  export type EnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose'>
    


  /**
   * Reference to a field of type 'OtpPurpose[]'
   */
  export type ListEnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose[]'>
    


  /**
   * Reference to a field of type 'SecurityEventType'
   */
  export type EnumSecurityEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SecurityEventType'>
    


  /**
   * Reference to a field of type 'SecurityEventType[]'
   */
  export type ListEnumSecurityEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SecurityEventType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumberVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordUpdatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    identities?: AuthIdentityListRelationFilter
    otpChallenges?: OtpChallengeListRelationFilter
    passwordResetAuthorizations?: PasswordResetAuthorizationListRelationFilter
    sessions?: SessionListRelationFilter
    securityEvents?: SecurityEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    phoneNumberVerifiedAt?: SortOrderInput | SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    passwordUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    identities?: AuthIdentityOrderByRelationAggregateInput
    otpChallenges?: OtpChallengeOrderByRelationAggregateInput
    passwordResetAuthorizations?: PasswordResetAuthorizationOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    securityEvents?: SecurityEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumberVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordUpdatedAt?: DateTimeFilter<"User"> | Date | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    identities?: AuthIdentityListRelationFilter
    otpChallenges?: OtpChallengeListRelationFilter
    passwordResetAuthorizations?: PasswordResetAuthorizationListRelationFilter
    sessions?: SessionListRelationFilter
    securityEvents?: SecurityEventListRelationFilter
  }, "id" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    isActive?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    phoneNumberVerifiedAt?: SortOrderInput | SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    passwordUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    phoneNumberVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    failedLoginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    passwordUpdatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthIdentityWhereInput = {
    AND?: AuthIdentityWhereInput | AuthIdentityWhereInput[]
    OR?: AuthIdentityWhereInput[]
    NOT?: AuthIdentityWhereInput | AuthIdentityWhereInput[]
    id?: StringFilter<"AuthIdentity"> | string
    userId?: StringFilter<"AuthIdentity"> | string
    provider?: EnumAuthProviderFilter<"AuthIdentity"> | $Enums.AuthProvider
    providerSubject?: StringFilter<"AuthIdentity"> | string
    email?: StringNullableFilter<"AuthIdentity"> | string | null
    createdAt?: DateTimeFilter<"AuthIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"AuthIdentity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthIdentityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerSubject?: SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerSubject?: AuthIdentityProviderProviderSubjectCompoundUniqueInput
    AND?: AuthIdentityWhereInput | AuthIdentityWhereInput[]
    OR?: AuthIdentityWhereInput[]
    NOT?: AuthIdentityWhereInput | AuthIdentityWhereInput[]
    userId?: StringFilter<"AuthIdentity"> | string
    provider?: EnumAuthProviderFilter<"AuthIdentity"> | $Enums.AuthProvider
    providerSubject?: StringFilter<"AuthIdentity"> | string
    email?: StringNullableFilter<"AuthIdentity"> | string | null
    createdAt?: DateTimeFilter<"AuthIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"AuthIdentity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerSubject">

  export type AuthIdentityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerSubject?: SortOrder
    email?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthIdentityCountOrderByAggregateInput
    _max?: AuthIdentityMaxOrderByAggregateInput
    _min?: AuthIdentityMinOrderByAggregateInput
  }

  export type AuthIdentityScalarWhereWithAggregatesInput = {
    AND?: AuthIdentityScalarWhereWithAggregatesInput | AuthIdentityScalarWhereWithAggregatesInput[]
    OR?: AuthIdentityScalarWhereWithAggregatesInput[]
    NOT?: AuthIdentityScalarWhereWithAggregatesInput | AuthIdentityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthIdentity"> | string
    userId?: StringWithAggregatesFilter<"AuthIdentity"> | string
    provider?: EnumAuthProviderWithAggregatesFilter<"AuthIdentity"> | $Enums.AuthProvider
    providerSubject?: StringWithAggregatesFilter<"AuthIdentity"> | string
    email?: StringNullableWithAggregatesFilter<"AuthIdentity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthIdentity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AuthIdentity"> | Date | string
  }

  export type OtpChallengeWhereInput = {
    AND?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    OR?: OtpChallengeWhereInput[]
    NOT?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    id?: StringFilter<"OtpChallenge"> | string
    userId?: StringFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpChallenge"> | string
    expiresAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    attempts?: IntFilter<"OtpChallenge"> | number
    maxAttempts?: IntFilter<"OtpChallenge"> | number
    consumedAt?: DateTimeNullableFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OtpChallengeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OtpChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    OR?: OtpChallengeWhereInput[]
    NOT?: OtpChallengeWhereInput | OtpChallengeWhereInput[]
    userId?: StringFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpChallenge"> | string
    expiresAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    attempts?: IntFilter<"OtpChallenge"> | number
    maxAttempts?: IntFilter<"OtpChallenge"> | number
    consumedAt?: DateTimeNullableFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OtpChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OtpChallengeCountOrderByAggregateInput
    _avg?: OtpChallengeAvgOrderByAggregateInput
    _max?: OtpChallengeMaxOrderByAggregateInput
    _min?: OtpChallengeMinOrderByAggregateInput
    _sum?: OtpChallengeSumOrderByAggregateInput
  }

  export type OtpChallengeScalarWhereWithAggregatesInput = {
    AND?: OtpChallengeScalarWhereWithAggregatesInput | OtpChallengeScalarWhereWithAggregatesInput[]
    OR?: OtpChallengeScalarWhereWithAggregatesInput[]
    NOT?: OtpChallengeScalarWhereWithAggregatesInput | OtpChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpChallenge"> | string
    userId?: StringWithAggregatesFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeWithAggregatesFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringWithAggregatesFilter<"OtpChallenge"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string
    attempts?: IntWithAggregatesFilter<"OtpChallenge"> | number
    maxAttempts?: IntWithAggregatesFilter<"OtpChallenge"> | number
    consumedAt?: DateTimeNullableWithAggregatesFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OtpChallenge"> | Date | string
  }

  export type PasswordResetAuthorizationWhereInput = {
    AND?: PasswordResetAuthorizationWhereInput | PasswordResetAuthorizationWhereInput[]
    OR?: PasswordResetAuthorizationWhereInput[]
    NOT?: PasswordResetAuthorizationWhereInput | PasswordResetAuthorizationWhereInput[]
    id?: StringFilter<"PasswordResetAuthorization"> | string
    userId?: StringFilter<"PasswordResetAuthorization"> | string
    tokenHash?: StringFilter<"PasswordResetAuthorization"> | string
    expiresAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
    consumedAt?: DateTimeNullableFilter<"PasswordResetAuthorization"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetAuthorizationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetAuthorizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: PasswordResetAuthorizationWhereInput | PasswordResetAuthorizationWhereInput[]
    OR?: PasswordResetAuthorizationWhereInput[]
    NOT?: PasswordResetAuthorizationWhereInput | PasswordResetAuthorizationWhereInput[]
    userId?: StringFilter<"PasswordResetAuthorization"> | string
    expiresAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
    consumedAt?: DateTimeNullableFilter<"PasswordResetAuthorization"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "tokenHash">

  export type PasswordResetAuthorizationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetAuthorizationCountOrderByAggregateInput
    _max?: PasswordResetAuthorizationMaxOrderByAggregateInput
    _min?: PasswordResetAuthorizationMinOrderByAggregateInput
  }

  export type PasswordResetAuthorizationScalarWhereWithAggregatesInput = {
    AND?: PasswordResetAuthorizationScalarWhereWithAggregatesInput | PasswordResetAuthorizationScalarWhereWithAggregatesInput[]
    OR?: PasswordResetAuthorizationScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetAuthorizationScalarWhereWithAggregatesInput | PasswordResetAuthorizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetAuthorization"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetAuthorization"> | string
    tokenHash?: StringWithAggregatesFilter<"PasswordResetAuthorization"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetAuthorization"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"PasswordResetAuthorization"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetAuthorization"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    revocationReason?: StringNullableFilter<"Session"> | string | null
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrder
    revocationReason?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    revocationReason?: StringNullableFilter<"Session"> | string | null
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrder
    revocationReason?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastUsedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    revocationReason?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    sessionId?: StringFilter<"RefreshToken"> | string
    familyId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedByTokenId?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    familyId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    replacedByTokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    sessionId?: StringFilter<"RefreshToken"> | string
    familyId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedByTokenId?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id" | "tokenHash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    familyId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    replacedByTokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    sessionId?: StringWithAggregatesFilter<"RefreshToken"> | string
    familyId?: StringWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    replacedByTokenId?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type SecurityEventWhereInput = {
    AND?: SecurityEventWhereInput | SecurityEventWhereInput[]
    OR?: SecurityEventWhereInput[]
    NOT?: SecurityEventWhereInput | SecurityEventWhereInput[]
    id?: StringFilter<"SecurityEvent"> | string
    userId?: StringNullableFilter<"SecurityEvent"> | string | null
    type?: EnumSecurityEventTypeFilter<"SecurityEvent"> | $Enums.SecurityEventType
    ipAddress?: StringNullableFilter<"SecurityEvent"> | string | null
    userAgent?: StringNullableFilter<"SecurityEvent"> | string | null
    metadata?: JsonNullableFilter<"SecurityEvent">
    createdAt?: DateTimeFilter<"SecurityEvent"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SecurityEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    type?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SecurityEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityEventWhereInput | SecurityEventWhereInput[]
    OR?: SecurityEventWhereInput[]
    NOT?: SecurityEventWhereInput | SecurityEventWhereInput[]
    userId?: StringNullableFilter<"SecurityEvent"> | string | null
    type?: EnumSecurityEventTypeFilter<"SecurityEvent"> | $Enums.SecurityEventType
    ipAddress?: StringNullableFilter<"SecurityEvent"> | string | null
    userAgent?: StringNullableFilter<"SecurityEvent"> | string | null
    metadata?: JsonNullableFilter<"SecurityEvent">
    createdAt?: DateTimeFilter<"SecurityEvent"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SecurityEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    type?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SecurityEventCountOrderByAggregateInput
    _max?: SecurityEventMaxOrderByAggregateInput
    _min?: SecurityEventMinOrderByAggregateInput
  }

  export type SecurityEventScalarWhereWithAggregatesInput = {
    AND?: SecurityEventScalarWhereWithAggregatesInput | SecurityEventScalarWhereWithAggregatesInput[]
    OR?: SecurityEventScalarWhereWithAggregatesInput[]
    NOT?: SecurityEventScalarWhereWithAggregatesInput | SecurityEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"SecurityEvent"> | string | null
    type?: EnumSecurityEventTypeWithAggregatesFilter<"SecurityEvent"> | $Enums.SecurityEventType
    ipAddress?: StringNullableWithAggregatesFilter<"SecurityEvent"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"SecurityEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"SecurityEvent">
    createdAt?: DateTimeWithAggregatesFilter<"SecurityEvent"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityUncheckedCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeUncheckedCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUncheckedUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthIdentityCreateInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIdentitiesInput
  }

  export type AuthIdentityUncheckedCreateInput = {
    id?: string
    userId: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthIdentityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIdentitiesNestedInput
  }

  export type AuthIdentityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthIdentityCreateManyInput = {
    id?: string
    userId: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthIdentityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthIdentityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeCreateInput = {
    id?: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOtpChallengesInput
  }

  export type OtpChallengeUncheckedCreateInput = {
    id?: string
    userId: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOtpChallengesNestedInput
  }

  export type OtpChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeCreateManyInput = {
    id?: string
    userId: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetAuthorizationsInput
  }

  export type PasswordResetAuthorizationUncheckedCreateInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetAuthorizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetAuthorizationsNestedInput
  }

  export type PasswordResetAuthorizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationCreateManyInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetAuthorizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
    session: SessionCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    sessionId: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    sessionId: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventCreateInput = {
    id?: string
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutSecurityEventsInput
  }

  export type SecurityEventUncheckedCreateInput = {
    id?: string
    userId?: string | null
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SecurityEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSecurityEventsNestedInput
  }

  export type SecurityEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventCreateManyInput = {
    id?: string
    userId?: string | null
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SecurityEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthIdentityListRelationFilter = {
    every?: AuthIdentityWhereInput
    some?: AuthIdentityWhereInput
    none?: AuthIdentityWhereInput
  }

  export type OtpChallengeListRelationFilter = {
    every?: OtpChallengeWhereInput
    some?: OtpChallengeWhereInput
    none?: OtpChallengeWhereInput
  }

  export type PasswordResetAuthorizationListRelationFilter = {
    every?: PasswordResetAuthorizationWhereInput
    some?: PasswordResetAuthorizationWhereInput
    none?: PasswordResetAuthorizationWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SecurityEventListRelationFilter = {
    every?: SecurityEventWhereInput
    some?: SecurityEventWhereInput
    none?: SecurityEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthIdentityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OtpChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetAuthorizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SecurityEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    emailVerifiedAt?: SortOrder
    phoneNumberVerifiedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    emailVerifiedAt?: SortOrder
    phoneNumberVerifiedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    isActive?: SortOrder
    emailVerifiedAt?: SortOrder
    phoneNumberVerifiedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AuthIdentityProviderProviderSubjectCompoundUniqueInput = {
    provider: $Enums.AuthProvider
    providerSubject: string
  }

  export type AuthIdentityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerSubject?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthIdentityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerSubject?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthIdentityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerSubject?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type EnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
  }

  export type OtpChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OtpChallengeAvgOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type OtpChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OtpChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    expiresAt?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OtpChallengeSumOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type EnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
  }

  export type PasswordResetAuthorizationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetAuthorizationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetAuthorizationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    lastUsedAt?: SortOrder
    revocationReason?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    lastUsedAt?: SortOrder
    revocationReason?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    lastUsedAt?: SortOrder
    revocationReason?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    familyId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    revokedAt?: SortOrder
    replacedByTokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    familyId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    revokedAt?: SortOrder
    replacedByTokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    familyId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    revokedAt?: SortOrder
    replacedByTokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSecurityEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityEventType | EnumSecurityEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSecurityEventTypeFilter<$PrismaModel> | $Enums.SecurityEventType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SecurityEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSecurityEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityEventType | EnumSecurityEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSecurityEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SecurityEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSecurityEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSecurityEventTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type AuthIdentityCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput> | AuthIdentityCreateWithoutUserInput[] | AuthIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthIdentityCreateOrConnectWithoutUserInput | AuthIdentityCreateOrConnectWithoutUserInput[]
    createMany?: AuthIdentityCreateManyUserInputEnvelope
    connect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
  }

  export type OtpChallengeCreateNestedManyWithoutUserInput = {
    create?: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput> | OtpChallengeCreateWithoutUserInput[] | OtpChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpChallengeCreateOrConnectWithoutUserInput | OtpChallengeCreateOrConnectWithoutUserInput[]
    createMany?: OtpChallengeCreateManyUserInputEnvelope
    connect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
  }

  export type PasswordResetAuthorizationCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput> | PasswordResetAuthorizationCreateWithoutUserInput[] | PasswordResetAuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetAuthorizationCreateOrConnectWithoutUserInput | PasswordResetAuthorizationCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetAuthorizationCreateManyUserInputEnvelope
    connect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SecurityEventCreateNestedManyWithoutUserInput = {
    create?: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput> | SecurityEventCreateWithoutUserInput[] | SecurityEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SecurityEventCreateOrConnectWithoutUserInput | SecurityEventCreateOrConnectWithoutUserInput[]
    createMany?: SecurityEventCreateManyUserInputEnvelope
    connect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
  }

  export type AuthIdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput> | AuthIdentityCreateWithoutUserInput[] | AuthIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthIdentityCreateOrConnectWithoutUserInput | AuthIdentityCreateOrConnectWithoutUserInput[]
    createMany?: AuthIdentityCreateManyUserInputEnvelope
    connect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
  }

  export type OtpChallengeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput> | OtpChallengeCreateWithoutUserInput[] | OtpChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpChallengeCreateOrConnectWithoutUserInput | OtpChallengeCreateOrConnectWithoutUserInput[]
    createMany?: OtpChallengeCreateManyUserInputEnvelope
    connect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
  }

  export type PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput> | PasswordResetAuthorizationCreateWithoutUserInput[] | PasswordResetAuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetAuthorizationCreateOrConnectWithoutUserInput | PasswordResetAuthorizationCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetAuthorizationCreateManyUserInputEnvelope
    connect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SecurityEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput> | SecurityEventCreateWithoutUserInput[] | SecurityEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SecurityEventCreateOrConnectWithoutUserInput | SecurityEventCreateOrConnectWithoutUserInput[]
    createMany?: SecurityEventCreateManyUserInputEnvelope
    connect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthIdentityUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput> | AuthIdentityCreateWithoutUserInput[] | AuthIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthIdentityCreateOrConnectWithoutUserInput | AuthIdentityCreateOrConnectWithoutUserInput[]
    upsert?: AuthIdentityUpsertWithWhereUniqueWithoutUserInput | AuthIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthIdentityCreateManyUserInputEnvelope
    set?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    disconnect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    delete?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    connect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    update?: AuthIdentityUpdateWithWhereUniqueWithoutUserInput | AuthIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthIdentityUpdateManyWithWhereWithoutUserInput | AuthIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthIdentityScalarWhereInput | AuthIdentityScalarWhereInput[]
  }

  export type OtpChallengeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput> | OtpChallengeCreateWithoutUserInput[] | OtpChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpChallengeCreateOrConnectWithoutUserInput | OtpChallengeCreateOrConnectWithoutUserInput[]
    upsert?: OtpChallengeUpsertWithWhereUniqueWithoutUserInput | OtpChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OtpChallengeCreateManyUserInputEnvelope
    set?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    disconnect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    delete?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    connect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    update?: OtpChallengeUpdateWithWhereUniqueWithoutUserInput | OtpChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OtpChallengeUpdateManyWithWhereWithoutUserInput | OtpChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OtpChallengeScalarWhereInput | OtpChallengeScalarWhereInput[]
  }

  export type PasswordResetAuthorizationUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput> | PasswordResetAuthorizationCreateWithoutUserInput[] | PasswordResetAuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetAuthorizationCreateOrConnectWithoutUserInput | PasswordResetAuthorizationCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetAuthorizationUpsertWithWhereUniqueWithoutUserInput | PasswordResetAuthorizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetAuthorizationCreateManyUserInputEnvelope
    set?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    disconnect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    delete?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    connect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    update?: PasswordResetAuthorizationUpdateWithWhereUniqueWithoutUserInput | PasswordResetAuthorizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetAuthorizationUpdateManyWithWhereWithoutUserInput | PasswordResetAuthorizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetAuthorizationScalarWhereInput | PasswordResetAuthorizationScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SecurityEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput> | SecurityEventCreateWithoutUserInput[] | SecurityEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SecurityEventCreateOrConnectWithoutUserInput | SecurityEventCreateOrConnectWithoutUserInput[]
    upsert?: SecurityEventUpsertWithWhereUniqueWithoutUserInput | SecurityEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SecurityEventCreateManyUserInputEnvelope
    set?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    disconnect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    delete?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    connect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    update?: SecurityEventUpdateWithWhereUniqueWithoutUserInput | SecurityEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SecurityEventUpdateManyWithWhereWithoutUserInput | SecurityEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SecurityEventScalarWhereInput | SecurityEventScalarWhereInput[]
  }

  export type AuthIdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput> | AuthIdentityCreateWithoutUserInput[] | AuthIdentityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthIdentityCreateOrConnectWithoutUserInput | AuthIdentityCreateOrConnectWithoutUserInput[]
    upsert?: AuthIdentityUpsertWithWhereUniqueWithoutUserInput | AuthIdentityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthIdentityCreateManyUserInputEnvelope
    set?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    disconnect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    delete?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    connect?: AuthIdentityWhereUniqueInput | AuthIdentityWhereUniqueInput[]
    update?: AuthIdentityUpdateWithWhereUniqueWithoutUserInput | AuthIdentityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthIdentityUpdateManyWithWhereWithoutUserInput | AuthIdentityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthIdentityScalarWhereInput | AuthIdentityScalarWhereInput[]
  }

  export type OtpChallengeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput> | OtpChallengeCreateWithoutUserInput[] | OtpChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpChallengeCreateOrConnectWithoutUserInput | OtpChallengeCreateOrConnectWithoutUserInput[]
    upsert?: OtpChallengeUpsertWithWhereUniqueWithoutUserInput | OtpChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OtpChallengeCreateManyUserInputEnvelope
    set?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    disconnect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    delete?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    connect?: OtpChallengeWhereUniqueInput | OtpChallengeWhereUniqueInput[]
    update?: OtpChallengeUpdateWithWhereUniqueWithoutUserInput | OtpChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OtpChallengeUpdateManyWithWhereWithoutUserInput | OtpChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OtpChallengeScalarWhereInput | OtpChallengeScalarWhereInput[]
  }

  export type PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput> | PasswordResetAuthorizationCreateWithoutUserInput[] | PasswordResetAuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetAuthorizationCreateOrConnectWithoutUserInput | PasswordResetAuthorizationCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetAuthorizationUpsertWithWhereUniqueWithoutUserInput | PasswordResetAuthorizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetAuthorizationCreateManyUserInputEnvelope
    set?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    disconnect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    delete?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    connect?: PasswordResetAuthorizationWhereUniqueInput | PasswordResetAuthorizationWhereUniqueInput[]
    update?: PasswordResetAuthorizationUpdateWithWhereUniqueWithoutUserInput | PasswordResetAuthorizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetAuthorizationUpdateManyWithWhereWithoutUserInput | PasswordResetAuthorizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetAuthorizationScalarWhereInput | PasswordResetAuthorizationScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SecurityEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput> | SecurityEventCreateWithoutUserInput[] | SecurityEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SecurityEventCreateOrConnectWithoutUserInput | SecurityEventCreateOrConnectWithoutUserInput[]
    upsert?: SecurityEventUpsertWithWhereUniqueWithoutUserInput | SecurityEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SecurityEventCreateManyUserInputEnvelope
    set?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    disconnect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    delete?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    connect?: SecurityEventWhereUniqueInput | SecurityEventWhereUniqueInput[]
    update?: SecurityEventUpdateWithWhereUniqueWithoutUserInput | SecurityEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SecurityEventUpdateManyWithWhereWithoutUserInput | SecurityEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SecurityEventScalarWhereInput | SecurityEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutIdentitiesInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider
  }

  export type UserUpdateOneRequiredWithoutIdentitiesNestedInput = {
    create?: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput
    upsert?: UserUpsertWithoutIdentitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutIdentitiesInput, UserUpdateWithoutIdentitiesInput>, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserCreateNestedOneWithoutOtpChallengesInput = {
    create?: XOR<UserCreateWithoutOtpChallengesInput, UserUncheckedCreateWithoutOtpChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOtpChallengesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOtpPurposeFieldUpdateOperationsInput = {
    set?: $Enums.OtpPurpose
  }

  export type UserUpdateOneRequiredWithoutOtpChallengesNestedInput = {
    create?: XOR<UserCreateWithoutOtpChallengesInput, UserUncheckedCreateWithoutOtpChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOtpChallengesInput
    upsert?: UserUpsertWithoutOtpChallengesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOtpChallengesInput, UserUpdateWithoutOtpChallengesInput>, UserUncheckedUpdateWithoutOtpChallengesInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetAuthorizationsInput = {
    create?: XOR<UserCreateWithoutPasswordResetAuthorizationsInput, UserUncheckedCreateWithoutPasswordResetAuthorizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetAuthorizationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetAuthorizationsNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetAuthorizationsInput, UserUncheckedCreateWithoutPasswordResetAuthorizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetAuthorizationsInput
    upsert?: UserUpsertWithoutPasswordResetAuthorizationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetAuthorizationsInput, UserUpdateWithoutPasswordResetAuthorizationsInput>, UserUncheckedUpdateWithoutPasswordResetAuthorizationsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type RefreshTokenCreateNestedManyWithoutSessionInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput> | RefreshTokenCreateWithoutSessionInput[] | RefreshTokenUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput | RefreshTokenCreateOrConnectWithoutSessionInput[]
    createMany?: RefreshTokenCreateManySessionInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput> | RefreshTokenCreateWithoutSessionInput[] | RefreshTokenUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput | RefreshTokenCreateOrConnectWithoutSessionInput[]
    createMany?: RefreshTokenCreateManySessionInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type RefreshTokenUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput> | RefreshTokenCreateWithoutSessionInput[] | RefreshTokenUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput | RefreshTokenCreateOrConnectWithoutSessionInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutSessionInput | RefreshTokenUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RefreshTokenCreateManySessionInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutSessionInput | RefreshTokenUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutSessionInput | RefreshTokenUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput> | RefreshTokenCreateWithoutSessionInput[] | RefreshTokenUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutSessionInput | RefreshTokenCreateOrConnectWithoutSessionInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutSessionInput | RefreshTokenUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RefreshTokenCreateManySessionInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutSessionInput | RefreshTokenUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutSessionInput | RefreshTokenUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<SessionCreateWithoutRefreshTokensInput, SessionUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRefreshTokensInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<SessionCreateWithoutRefreshTokensInput, SessionUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRefreshTokensInput
    upsert?: SessionUpsertWithoutRefreshTokensInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRefreshTokensInput, SessionUpdateWithoutRefreshTokensInput>, SessionUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutSecurityEventsInput = {
    create?: XOR<UserCreateWithoutSecurityEventsInput, UserUncheckedCreateWithoutSecurityEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecurityEventsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSecurityEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.SecurityEventType
  }

  export type UserUpdateOneWithoutSecurityEventsNestedInput = {
    create?: XOR<UserCreateWithoutSecurityEventsInput, UserUncheckedCreateWithoutSecurityEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSecurityEventsInput
    upsert?: UserUpsertWithoutSecurityEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSecurityEventsInput, UserUpdateWithoutSecurityEventsInput>, UserUncheckedUpdateWithoutSecurityEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type NestedEnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
  }

  export type NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
  }

  export type NestedEnumSecurityEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityEventType | EnumSecurityEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSecurityEventTypeFilter<$PrismaModel> | $Enums.SecurityEventType
  }

  export type NestedEnumSecurityEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityEventType | EnumSecurityEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SecurityEventType[] | ListEnumSecurityEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSecurityEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SecurityEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSecurityEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSecurityEventTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuthIdentityCreateWithoutUserInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthIdentityUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthIdentityCreateOrConnectWithoutUserInput = {
    where: AuthIdentityWhereUniqueInput
    create: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput>
  }

  export type AuthIdentityCreateManyUserInputEnvelope = {
    data: AuthIdentityCreateManyUserInput | AuthIdentityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OtpChallengeCreateWithoutUserInput = {
    id?: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpChallengeUncheckedCreateWithoutUserInput = {
    id?: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpChallengeCreateOrConnectWithoutUserInput = {
    where: OtpChallengeWhereUniqueInput
    create: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput>
  }

  export type OtpChallengeCreateManyUserInputEnvelope = {
    data: OtpChallengeCreateManyUserInput | OtpChallengeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetAuthorizationCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetAuthorizationUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetAuthorizationCreateOrConnectWithoutUserInput = {
    where: PasswordResetAuthorizationWhereUniqueInput
    create: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetAuthorizationCreateManyUserInputEnvelope = {
    data: PasswordResetAuthorizationCreateManyUserInput | PasswordResetAuthorizationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SecurityEventCreateWithoutUserInput = {
    id?: string
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SecurityEventUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SecurityEventCreateOrConnectWithoutUserInput = {
    where: SecurityEventWhereUniqueInput
    create: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput>
  }

  export type SecurityEventCreateManyUserInputEnvelope = {
    data: SecurityEventCreateManyUserInput | SecurityEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthIdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthIdentityWhereUniqueInput
    update: XOR<AuthIdentityUpdateWithoutUserInput, AuthIdentityUncheckedUpdateWithoutUserInput>
    create: XOR<AuthIdentityCreateWithoutUserInput, AuthIdentityUncheckedCreateWithoutUserInput>
  }

  export type AuthIdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthIdentityWhereUniqueInput
    data: XOR<AuthIdentityUpdateWithoutUserInput, AuthIdentityUncheckedUpdateWithoutUserInput>
  }

  export type AuthIdentityUpdateManyWithWhereWithoutUserInput = {
    where: AuthIdentityScalarWhereInput
    data: XOR<AuthIdentityUpdateManyMutationInput, AuthIdentityUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthIdentityScalarWhereInput = {
    AND?: AuthIdentityScalarWhereInput | AuthIdentityScalarWhereInput[]
    OR?: AuthIdentityScalarWhereInput[]
    NOT?: AuthIdentityScalarWhereInput | AuthIdentityScalarWhereInput[]
    id?: StringFilter<"AuthIdentity"> | string
    userId?: StringFilter<"AuthIdentity"> | string
    provider?: EnumAuthProviderFilter<"AuthIdentity"> | $Enums.AuthProvider
    providerSubject?: StringFilter<"AuthIdentity"> | string
    email?: StringNullableFilter<"AuthIdentity"> | string | null
    createdAt?: DateTimeFilter<"AuthIdentity"> | Date | string
    updatedAt?: DateTimeFilter<"AuthIdentity"> | Date | string
  }

  export type OtpChallengeUpsertWithWhereUniqueWithoutUserInput = {
    where: OtpChallengeWhereUniqueInput
    update: XOR<OtpChallengeUpdateWithoutUserInput, OtpChallengeUncheckedUpdateWithoutUserInput>
    create: XOR<OtpChallengeCreateWithoutUserInput, OtpChallengeUncheckedCreateWithoutUserInput>
  }

  export type OtpChallengeUpdateWithWhereUniqueWithoutUserInput = {
    where: OtpChallengeWhereUniqueInput
    data: XOR<OtpChallengeUpdateWithoutUserInput, OtpChallengeUncheckedUpdateWithoutUserInput>
  }

  export type OtpChallengeUpdateManyWithWhereWithoutUserInput = {
    where: OtpChallengeScalarWhereInput
    data: XOR<OtpChallengeUpdateManyMutationInput, OtpChallengeUncheckedUpdateManyWithoutUserInput>
  }

  export type OtpChallengeScalarWhereInput = {
    AND?: OtpChallengeScalarWhereInput | OtpChallengeScalarWhereInput[]
    OR?: OtpChallengeScalarWhereInput[]
    NOT?: OtpChallengeScalarWhereInput | OtpChallengeScalarWhereInput[]
    id?: StringFilter<"OtpChallenge"> | string
    userId?: StringFilter<"OtpChallenge"> | string
    purpose?: EnumOtpPurposeFilter<"OtpChallenge"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpChallenge"> | string
    expiresAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    attempts?: IntFilter<"OtpChallenge"> | number
    maxAttempts?: IntFilter<"OtpChallenge"> | number
    consumedAt?: DateTimeNullableFilter<"OtpChallenge"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpChallenge"> | Date | string
    updatedAt?: DateTimeFilter<"OtpChallenge"> | Date | string
  }

  export type PasswordResetAuthorizationUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetAuthorizationWhereUniqueInput
    update: XOR<PasswordResetAuthorizationUpdateWithoutUserInput, PasswordResetAuthorizationUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetAuthorizationCreateWithoutUserInput, PasswordResetAuthorizationUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetAuthorizationUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetAuthorizationWhereUniqueInput
    data: XOR<PasswordResetAuthorizationUpdateWithoutUserInput, PasswordResetAuthorizationUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetAuthorizationUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetAuthorizationScalarWhereInput
    data: XOR<PasswordResetAuthorizationUpdateManyMutationInput, PasswordResetAuthorizationUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetAuthorizationScalarWhereInput = {
    AND?: PasswordResetAuthorizationScalarWhereInput | PasswordResetAuthorizationScalarWhereInput[]
    OR?: PasswordResetAuthorizationScalarWhereInput[]
    NOT?: PasswordResetAuthorizationScalarWhereInput | PasswordResetAuthorizationScalarWhereInput[]
    id?: StringFilter<"PasswordResetAuthorization"> | string
    userId?: StringFilter<"PasswordResetAuthorization"> | string
    tokenHash?: StringFilter<"PasswordResetAuthorization"> | string
    expiresAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
    consumedAt?: DateTimeNullableFilter<"PasswordResetAuthorization"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetAuthorization"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    lastUsedAt?: DateTimeFilter<"Session"> | Date | string
    revocationReason?: StringNullableFilter<"Session"> | string | null
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type SecurityEventUpsertWithWhereUniqueWithoutUserInput = {
    where: SecurityEventWhereUniqueInput
    update: XOR<SecurityEventUpdateWithoutUserInput, SecurityEventUncheckedUpdateWithoutUserInput>
    create: XOR<SecurityEventCreateWithoutUserInput, SecurityEventUncheckedCreateWithoutUserInput>
  }

  export type SecurityEventUpdateWithWhereUniqueWithoutUserInput = {
    where: SecurityEventWhereUniqueInput
    data: XOR<SecurityEventUpdateWithoutUserInput, SecurityEventUncheckedUpdateWithoutUserInput>
  }

  export type SecurityEventUpdateManyWithWhereWithoutUserInput = {
    where: SecurityEventScalarWhereInput
    data: XOR<SecurityEventUpdateManyMutationInput, SecurityEventUncheckedUpdateManyWithoutUserInput>
  }

  export type SecurityEventScalarWhereInput = {
    AND?: SecurityEventScalarWhereInput | SecurityEventScalarWhereInput[]
    OR?: SecurityEventScalarWhereInput[]
    NOT?: SecurityEventScalarWhereInput | SecurityEventScalarWhereInput[]
    id?: StringFilter<"SecurityEvent"> | string
    userId?: StringNullableFilter<"SecurityEvent"> | string | null
    type?: EnumSecurityEventTypeFilter<"SecurityEvent"> | $Enums.SecurityEventType
    ipAddress?: StringNullableFilter<"SecurityEvent"> | string | null
    userAgent?: StringNullableFilter<"SecurityEvent"> | string | null
    metadata?: JsonNullableFilter<"SecurityEvent">
    createdAt?: DateTimeFilter<"SecurityEvent"> | Date | string
  }

  export type UserCreateWithoutIdentitiesInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    otpChallenges?: OtpChallengeCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutIdentitiesInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    otpChallenges?: OtpChallengeUncheckedCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutIdentitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
  }

  export type UserUpsertWithoutIdentitiesInput = {
    update: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
    create: XOR<UserCreateWithoutIdentitiesInput, UserUncheckedCreateWithoutIdentitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutIdentitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutIdentitiesInput, UserUncheckedUpdateWithoutIdentitiesInput>
  }

  export type UserUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    otpChallenges?: OtpChallengeUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    otpChallenges?: OtpChallengeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOtpChallengesInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOtpChallengesInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityUncheckedCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOtpChallengesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOtpChallengesInput, UserUncheckedCreateWithoutOtpChallengesInput>
  }

  export type UserUpsertWithoutOtpChallengesInput = {
    update: XOR<UserUpdateWithoutOtpChallengesInput, UserUncheckedUpdateWithoutOtpChallengesInput>
    create: XOR<UserCreateWithoutOtpChallengesInput, UserUncheckedCreateWithoutOtpChallengesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOtpChallengesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOtpChallengesInput, UserUncheckedUpdateWithoutOtpChallengesInput>
  }

  export type UserUpdateWithoutOtpChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOtpChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUncheckedUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetAuthorizationsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetAuthorizationsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityUncheckedCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetAuthorizationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetAuthorizationsInput, UserUncheckedCreateWithoutPasswordResetAuthorizationsInput>
  }

  export type UserUpsertWithoutPasswordResetAuthorizationsInput = {
    update: XOR<UserUpdateWithoutPasswordResetAuthorizationsInput, UserUncheckedUpdateWithoutPasswordResetAuthorizationsInput>
    create: XOR<UserCreateWithoutPasswordResetAuthorizationsInput, UserUncheckedCreateWithoutPasswordResetAuthorizationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetAuthorizationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetAuthorizationsInput, UserUncheckedUpdateWithoutPasswordResetAuthorizationsInput>
  }

  export type UserUpdateWithoutPasswordResetAuthorizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetAuthorizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUncheckedUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityUncheckedCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeUncheckedCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput
    securityEvents?: SecurityEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type RefreshTokenCreateWithoutSessionInput = {
    id?: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutSessionInput = {
    id?: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutSessionInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
  }

  export type RefreshTokenCreateManySessionInputEnvelope = {
    data: RefreshTokenCreateManySessionInput | RefreshTokenCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUncheckedUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput
    securityEvents?: SecurityEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutSessionInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutSessionInput, RefreshTokenUncheckedUpdateWithoutSessionInput>
    create: XOR<RefreshTokenCreateWithoutSessionInput, RefreshTokenUncheckedCreateWithoutSessionInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutSessionInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutSessionInput, RefreshTokenUncheckedUpdateWithoutSessionInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutSessionInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutSessionInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    sessionId?: StringFilter<"RefreshToken"> | string
    familyId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedByTokenId?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type SessionCreateWithoutRefreshTokensInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    userId: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutRefreshTokensInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRefreshTokensInput, SessionUncheckedCreateWithoutRefreshTokensInput>
  }

  export type SessionUpsertWithoutRefreshTokensInput = {
    update: XOR<SessionUpdateWithoutRefreshTokensInput, SessionUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<SessionCreateWithoutRefreshTokensInput, SessionUncheckedCreateWithoutRefreshTokensInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRefreshTokensInput, SessionUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type SessionUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSecurityEventsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSecurityEventsInput = {
    id?: string
    email?: string | null
    phoneNumber?: string | null
    passwordHash?: string | null
    firstName?: string | null
    lastName?: string | null
    isActive?: boolean
    emailVerifiedAt?: Date | string | null
    phoneNumberVerifiedAt?: Date | string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordUpdatedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    identities?: AuthIdentityUncheckedCreateNestedManyWithoutUserInput
    otpChallenges?: OtpChallengeUncheckedCreateNestedManyWithoutUserInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSecurityEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSecurityEventsInput, UserUncheckedCreateWithoutSecurityEventsInput>
  }

  export type UserUpsertWithoutSecurityEventsInput = {
    update: XOR<UserUpdateWithoutSecurityEventsInput, UserUncheckedUpdateWithoutSecurityEventsInput>
    create: XOR<UserCreateWithoutSecurityEventsInput, UserUncheckedCreateWithoutSecurityEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSecurityEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSecurityEventsInput, UserUncheckedUpdateWithoutSecurityEventsInput>
  }

  export type UserUpdateWithoutSecurityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSecurityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumberVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    identities?: AuthIdentityUncheckedUpdateManyWithoutUserNestedInput
    otpChallenges?: OtpChallengeUncheckedUpdateManyWithoutUserNestedInput
    passwordResetAuthorizations?: PasswordResetAuthorizationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AuthIdentityCreateManyUserInput = {
    id?: string
    provider: $Enums.AuthProvider
    providerSubject: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpChallengeCreateManyUserInput = {
    id?: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    expiresAt: Date | string
    attempts?: number
    maxAttempts?: number
    consumedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetAuthorizationCreateManyUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    lastUsedAt?: Date | string
    revocationReason?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SecurityEventCreateManyUserInput = {
    id?: string
    type: $Enums.SecurityEventType
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuthIdentityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthIdentityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthIdentityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerSubject?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpChallengeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetAuthorizationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revocationReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumSecurityEventTypeFieldUpdateOperationsInput | $Enums.SecurityEventType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManySessionInput = {
    id?: string
    familyId: string
    tokenHash: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    revokedAt?: Date | string | null
    replacedByTokenId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedByTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}