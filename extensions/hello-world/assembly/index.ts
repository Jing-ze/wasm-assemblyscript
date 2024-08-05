export * from "proxy-wasm-assemblyscript-sdk-test/assembly/proxy";
import { SetCtx, HttpContext, ProcessRequestHeadersBy, logger } from "wasm-assemblyscript-test/assembly";
import { FilterHeadersStatusValues, send_http_response, stream_context } from "proxy-wasm-assemblyscript-sdk-test/assembly"

class HelloWorldConfig {
}

SetCtx<HelloWorldConfig>("hello-world", [ProcessRequestHeadersBy<HelloWorldConfig>(onHttpRequestHeaders)])


function onHttpRequestHeaders(context: HttpContext, config: HelloWorldConfig | null): FilterHeadersStatusValues {
  stream_context.headers.request.add("hello", "world")
  logger.Debug("set request header")
  send_http_response(200, "hello-world", String.UTF8.encode("[wasm-assemblyscript]hello world"), []);
  return FilterHeadersStatusValues.Continue;
}