# ts-retrofit

[![build status](https://travis-ci.org/nullcc/ts-retrofit.svg?branch=master)](https://travis-ci.org/nullcc/ts-retrofit)
[![](https://img.shields.io/npm/dm/ts-retrofit.svg?style=flat)](https://www.npmjs.org/package/ts-retrofit)

| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](https://img.shields.io/badge/Coverage-97.81%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-81.31%25-yellow.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-98.77%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-97.81%25-brightgreen.svg "Make me better!") |

> A declarative and axios based retrofit implementation for JavaScript and TypeScript.

## Install

```bash
$ npm i ts-retrofit
```

## Quick Overview

```typescript
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  HEAD,
  OPTIONS,
  BasePath,
  Header,
  Queries,
  Headers,
  Path,
  Query,
  QueryMap,
  Body,
  FormUrlEncoded,
  Field,
  FieldMap,
  Multipart,
  ResponseType,
  Part,
  PartDescriptor,
  BaseService,
  Response,
  HeaderMap,
  ActionFilter,
  Filter,
  MethodContext,
} from "../../src/index";
import { AxiosRequestConfig } from "axios";

export const TEST_SERVER_HOST = "http://localhost";
export const TEST_SERVER_PORT = 12345;
export const TEST_SERVER_ENDPOINT = `${TEST_SERVER_HOST}:${TEST_SERVER_PORT}`;
export const API_PREFIX = "/api/v1";
export const TOKEN = "abcdef123456";
export const TEST_FILTER: Filter = {
  async invoke(
    mehtodContext: MethodContext,
    config: AxiosRequestConfig,
    next: () => Promise<Response>
  ) {
    const response = await next();
    response.headers = [];
    response.headers["Filter-Does-Work"] = true;
    response.headers['Args'] = mehtodContext.args;
    return response;
  },
};

export interface User {
  id?: number;
  name: string;
  age: number;
  [x: string]: any;
}

export interface SearchQuery {
  title?: string;
  author?: string;
  category?: string;
}

export interface Auth {
  username: string;
  password: string;
}

export interface Post {
  title: string;
  content: string;
}

export interface Group {
  name: string;
  description: string;
  members: number[];
  tags: string[];
}

@BasePath(API_PREFIX)
@ActionFilter(TEST_FILTER)
export class UserService extends BaseService {
  @GET("/users")
  async getUsers(@Header("X-Token") token: string): Promise<Response> {
    return <Response>{};
  }

  @GET(`${TEST_SERVER_ENDPOINT}/users`)
  async getUsersOther(@Header("X-Token") token: string): Promise<Response> { return <Response>{} };

  @GET("/users/{userId}")
  async getUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number
  ): Promise<Response> {
    return <Response>{};
  }

  @POST("/users")
  async createUser(
    @Header("X-Token") token: string,
    @Body user: User
  ): Promise<Response> {
    return <Response>{};
  }

  @PUT("/users/{userId}")
  async replaceUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
    @Body user: User
  ): Promise<Response> {
    return <Response>{};
  }

  @PATCH("/users/{userId}")
  async updateUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
    @Body user: Partial<User>
  ): Promise<Response> {
    return <Response>{};
  }

  @DELETE("/users/{userId}")
  async deleteUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number
  ): Promise<Response> {
    return <Response>{};
  }

  @HEAD("/users/{userId}")
  async headUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number
  ): Promise<Response> {
    return <Response>{};
  }

  @OPTIONS("/users/{userId}")
  async optionsUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number
  ): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class SearchService extends BaseService {
  @GET("/search")
  async search(
    @Header("X-Token") token: string,
    @QueryMap query: SearchQuery
  ): Promise<Response> {
    return <Response>{};
  }
}

@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth2/authorize")
  @Headers({
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    Accept: "application/json",
  })
  async auth(@Body body: Auth): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class PostService extends BaseService {
  @GET("/posts")
  @Queries({
    page: 1,
    size: 20,
    sort: "createdAt:desc",
  })
  async getPosts(): Promise<Response> {
    return <Response>{};
  }

  @GET("/posts")
  @Queries({
    page: 1,
    size: 20,
    sort: "createdAt:desc",
  })
  async getPosts1(@Query("group") group: string): Promise<Response> {
    return <Response>{};
  }

  @POST("/posts")
  @FormUrlEncoded
  async createPost(
    @Field("title") title: string,
    @Field("content") content: string
  ): Promise<Response> {
    return <Response>{};
  }

  @POST("/posts")
  @FormUrlEncoded
  async createPost2(@FieldMap post: Post): Promise<Response> {
    return <Response>{};
  }

  @POST("/posts")
  @FormUrlEncoded
  async createPost3(
    @HeaderMap headers: any,
    @FieldMap post: Post
  ): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class FileService extends BaseService {
  @POST("/upload")
  @Multipart
  async upload(
    @Part("bucket") bucket: PartDescriptor<string>,
    @Part("file") file: PartDescriptor<Buffer>
  ): Promise<Response> {
    return <Response>{};
  }

  @GET("/file")
  @ResponseType("stream")
  async getFile(@Path("fileId") fileId: string): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class MessagingService extends BaseService {
  @POST("/sms")
  @Multipart
  async createSMS(
    @Part("from") from: PartDescriptor<string>,
    @Part("to") to: PartDescriptor<string[]>
  ): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class GroupService extends BaseService {
  @POST("/groups")
  @FormUrlEncoded
  async createGroup(@Body body: Group): Promise<Response> {
    return <Response>{};
  }
}

@BasePath(API_PREFIX)
export class InterceptorService extends BaseService {
  @GET("/interceptor")
  async getParams(): Promise<Response> {
    return <Response>{};
  }

  @POST("/interceptor")
  async createParams(@Body body: Post): Promise<Response> {
    return <Response>{};
  }

  @GET("/header")
  async getHeader(): Promise<Response> {
    return <Response>{};
  }
}
```

See [test](test/ts-retrofit.test.ts) to get more examples.

## Decorators

|     Category     |      Name       |                         Description                          | Decorator Position |                           Example                            |
| :--------------: | :-------------: | :----------------------------------------------------------: | :----------------: | :----------------------------------------------------------: |
|   HTTP Method    |      @GET       |                          GET Method                          |       Method       |                        @GET("/users")                        |
|   HTTP Method    |      @POST      |                         POST Method                          |       Method       |                       @POST("/users")                        |
|   HTTP Method    |      @PUT       |                          PUT Method                          |       Method       |                   @PUT("/users/{userId}")                    |
|   HTTP Method    |     @PATCH      |                         PATCH Method                         |       Method       |                  @PATCH("/users/{userId}")                   |
|   HTTP Method    |     @DELETE     |                        DELETE Method                         |       Method       |                  @DELETE("/users/{userId}")                  |
|   HTTP Method    |      @HEAD      |                         HEAD Method                          |       Method       |                   @HEAD("/users/{userId}")                   |
|   HTTP Method    |    @OPTIONS     |                        OPTIONS Method                        |       Method       |                 @OPTIONS("/users/{userId}")                  |
|    Base Path     |    @BasePath    |    Specifying the base path of a series of API endpoints     |       Class        |                     @BasePath("/api/v1")                     |
|  Static Headers  |    @Headers     |        Specifying the static headers of API endpoint         |       Method       | @Headers({ "content-type": "application/x-www-form-urlencoded",   "Accept": "application/json" }) |
| Header Parameter |     @Header     |                    Parameterized header                     |  Method Parameter  |                      @Header("X-Token")                      |
| Header Parameters |    @HeaderMap    |                     Parameterized header                     |  Method Parameter  |                          @HeaderMap                           |
|  Path Parameter  |      @Path      |             Specifying parameter in path of API              |  Method Parameter  |                     @PathParam("userId")                     |
|       Body       |      @Body      |                     Specifying body data                     |  Method Parameter  |                            @Body                             |
|   Static Query   |     @Queries     |                 Specifying static query data                 |       Method       | @Queries({ page: 1,   size: 20,   sort: "createdAt:desc" }) |
| Query Parameter | @Query | Parameterized query | Method Parameter | @Query("group") |
| Query Parameters |    @QueryMap    |                     Parameterized query                     |  Method Parameter  |                          @QueryMap                           |
|  Static Headers  | @FormUrlEncoded | Specifying "content-type" to be "application/x-www-form-urlencoded" |       Method       |                       @FormUrlEncoded                        |
| Field Parameter  |     @Field      | Specifying field in method parameter, only effective when method has been decorated by @FormUrlEncoded |  Method Parameter  |                        @Field("name")                        |
| Field Parameters |    @FieldMap    | Specifying field map in method parameter, only effective when method has been decorated by @FormUrlEncoded |  Method Parameter  |                          @FieldMap                           |
|  Static Headers  |   @Multipart    |    Specifying "content-type" to be "multipart/form-data"     |       Method       |                          @Multipart                          |
| Part Parameters  |      @Part      | Specifying field map in method parameter, only effective when method has been decorated by @Multipart |  Method Parameter  |                        @Part("name")                         |
| Response  |      @ResponseType      | Specifying the response type in axios config|  Method  |                        @ResponseType("stream")                         |
| Filter  |      @ActionFilter      | Allow code to be run before or after in axios request  | Class or Method |                   @ActionFilter({invoke(){}})                         |

## Test

```bash
$ npm test
```
