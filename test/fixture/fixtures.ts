import {
  GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, BasePath, Header, Queries, Headers, Path, Query, QueryMap, Body,
  FormUrlEncoded, Field, FieldMap, Multipart, ResponseType, Part, PartDescriptor, BaseService, Response, HeaderMap,
  RequestTransformer, ResponseTransformer, Timeout, ResponseStatus, Config, Filter, MethodContext, ActionFilter,
} from "../../src";
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
    next: () => Promise<Response>,
  ) {
    const response = await next();
    response.headers = [];
    response.headers["Filter-Does-Work"] = true;
    response.headers.Args = mehtodContext.args;
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

export interface Something {
  name: string;
}

@BasePath(API_PREFIX)
@ActionFilter(TEST_FILTER)
export class UserService extends BaseService {
  @GET("/users")
  public async getUsers(@Header("X-Token") token: string): Promise<Response> {
    return  {} as Response;
  }

  @GET(`${TEST_SERVER_ENDPOINT}/users`)
  public async getUsersOther(@Header("X-Token") token: string): Promise<Response> { return  {} as Response; }

  @GET("/users/{userId}")
  public async getUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
  ): Promise<Response> {
    return  {} as Response;
  }

  @GET("/users/uid-{userId}")
  public async getUser1(@Header("X-Token") token: string, @Path("userId") userId: number): Promise<Response> { return  {} as Response; }

  @POST("/users")
  public async createUser(
    @Header("X-Token") token: string,
    @Body user: User,
  ): Promise<Response> {
    return  {} as Response;
  }

  @PUT("/users/{userId}")
  public async replaceUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
    @Body user: User,
  ): Promise<Response> {
    return  {} as Response;
  }

  @PATCH("/users/{userId}")
  public async updateUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
    @Body user: Partial<User>,
  ): Promise<Response> {
    return  {} as Response;
  }

  @DELETE("/users/{userId}")
  public async deleteUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
  ): Promise<Response> {
    return  {} as Response;
  }

  @HEAD("/users/{userId}")
  public async headUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
  ): Promise<Response> {
    return  {} as Response;
  }

  @OPTIONS("/users/{userId}")
  public async optionsUser(
    @Header("X-Token") token: string,
    @Path("userId") userId: number,
  ): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath(API_PREFIX)
export class SearchService extends BaseService {
  @GET("/search")
  public async search(
    @Header("X-Token") token: string,
    @QueryMap query: SearchQuery,
  ): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath("")
export class AuthService extends BaseService {
  @POST("/oauth2/authorize")
  @Headers({
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Accept": "application/json",
  })
  public async auth(@Body body: Auth): Promise<Response> {
    return  {} as Response;
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
  public async getPosts(): Promise<Response> {
    return  {} as Response;
  }

  @GET("/posts")
  @Queries({
    page: 1,
    size: 20,
    sort: "createdAt:desc",
  })
  public async getPosts1(@Query("group") group: string): Promise<Response> {
    return  {} as Response;
  }

  @POST("/posts")
  @FormUrlEncoded
  public async createPost(
    @Field("title") title: string,
    @Field("content") content: string,
  ): Promise<Response> {
    return  {} as Response;
  }

  @POST("/posts")
  @FormUrlEncoded
  public async createPost2(@FieldMap post: Post): Promise<Response> {
    return  {} as Response;
  }

  @POST("/posts")
  @FormUrlEncoded
  public async createPost3(
    @HeaderMap headers: any,
    @FieldMap post: Post,
  ): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath(API_PREFIX)
export class FileService extends BaseService {
  @POST("/upload")
  @Multipart
  public async upload(
    @Part("bucket") bucket: PartDescriptor<string>,
    @Part("file") file: PartDescriptor<Buffer>,
  ): Promise<Response> {
    return  {} as Response;
  }

  @GET("/file")
  @ResponseType("stream")
  public async getFile(@Path("fileId") fileId: string): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath(API_PREFIX)
export class MessagingService extends BaseService {
  @POST("/sms")
  @Multipart
  public async createSMS(
    @Part("from") from: PartDescriptor<string>,
    @Part("to") to: PartDescriptor<string[]>,
  ): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath(API_PREFIX)
export class GroupService extends BaseService {
  @POST("/groups")
  @FormUrlEncoded
  public async createGroup(@Body body: Group): Promise<Response> {
    return  {} as Response;
  }
}

@BasePath(API_PREFIX)
export class InterceptorService extends BaseService {
  @GET("/interceptor")
  public async getParams(): Promise<Response> {
    return  {} as Response;
  }

  @POST("/interceptor")
  public async createParams(@Body body: Post): Promise<Response> {
    return  {} as Response;
  }

  @GET("/header")
  public async getHeader(): Promise<Response> { return  {} as Response; }
}

@BasePath(API_PREFIX)
export class TransformerService extends BaseService {
  @POST("/request-transformer")
  @RequestTransformer((data: any, headers?: any) => {
    data.foo = "foo";
    return JSON.stringify(data);
  })
  public async createSomething(@Body body: Something): Promise<Response> { return  {} as Response; }

  @GET("/response-transformer")
  @ResponseTransformer((data: any, headers?: any) => {
    const json = JSON.parse(data);
    json.foo = "foo";
    return json;
  })
  public async getSomething(): Promise<Response<Something>> { return  {} as Response<Something>; }
}

@BasePath(API_PREFIX)
export class TimeoutService extends BaseService {
  @GET("/sleep-5000")
  public async sleep5000(): Promise<Response> { return  {} as Response; }

  @GET("/sleep-5000")
  @Timeout(3000)
  public async timeoutIn3000(): Promise<Response> { return  {} as Response; }

  @GET("/sleep-5000")
  @Timeout(6000)
  public async timeoutIn6000(): Promise<Response> { return  {} as Response; }
}

@BasePath(API_PREFIX)
export class ResponseStatusService extends BaseService {
  @GET("/response-status")
  @ResponseStatus(200)
  public async getSomething(): Promise<Response> { return  {} as Response; }
}

@BasePath(API_PREFIX)
export class ConfigService extends BaseService {
  @GET("/config")
  @Config({
    maxRedirects: 1,
  })
  @ResponseStatus(200)
  public async getConfig(): Promise<Response> { return  {} as Response; }
}
