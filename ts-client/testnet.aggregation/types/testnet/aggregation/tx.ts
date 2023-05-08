/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "testnet.aggregation";

export interface PriceInput {
  source: string;
  price: number;
}

export interface MsgAggregatePrice {
  creator: string;
  timestamp: number;
  prices: PriceInput[];
}

export interface MsgAggregatePriceResponse {
  id: number;
}

function createBasePriceInput(): PriceInput {
  return { source: "", price: 0 };
}

export const PriceInput = {
  encode(message: PriceInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.price !== 0) {
      writer.uint32(16).uint64(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PriceInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePriceInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.source = reader.string();
          break;
        case 2:
          message.price = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PriceInput {
    return {
      source: isSet(object.source) ? String(object.source) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: PriceInput): unknown {
    const obj: any = {};
    message.source !== undefined && (obj.source = message.source);
    message.price !== undefined && (obj.price = Math.round(message.price));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PriceInput>, I>>(object: I): PriceInput {
    const message = createBasePriceInput();
    message.source = object.source ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseMsgAggregatePrice(): MsgAggregatePrice {
  return { creator: "", timestamp: 0, prices: [] };
}

export const MsgAggregatePrice = {
  encode(message: MsgAggregatePrice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.timestamp !== 0) {
      writer.uint32(16).uint64(message.timestamp);
    }
    for (const v of message.prices) {
      PriceInput.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAggregatePrice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregatePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.timestamp = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.prices.push(PriceInput.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAggregatePrice {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      prices: Array.isArray(object?.prices) ? object.prices.map((e: any) => PriceInput.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgAggregatePrice): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    if (message.prices) {
      obj.prices = message.prices.map((e) => e ? PriceInput.toJSON(e) : undefined);
    } else {
      obj.prices = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAggregatePrice>, I>>(object: I): MsgAggregatePrice {
    const message = createBaseMsgAggregatePrice();
    message.creator = object.creator ?? "";
    message.timestamp = object.timestamp ?? 0;
    message.prices = object.prices?.map((e) => PriceInput.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgAggregatePriceResponse(): MsgAggregatePriceResponse {
  return { id: 0 };
}

export const MsgAggregatePriceResponse = {
  encode(message: MsgAggregatePriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAggregatePriceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregatePriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAggregatePriceResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgAggregatePriceResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAggregatePriceResponse>, I>>(object: I): MsgAggregatePriceResponse {
    const message = createBaseMsgAggregatePriceResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  AggregatePrice(request: MsgAggregatePrice): Promise<MsgAggregatePriceResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AggregatePrice = this.AggregatePrice.bind(this);
  }
  AggregatePrice(request: MsgAggregatePrice): Promise<MsgAggregatePriceResponse> {
    const data = MsgAggregatePrice.encode(request).finish();
    const promise = this.rpc.request("testnet.aggregation.Msg", "AggregatePrice", data);
    return promise.then((data) => MsgAggregatePriceResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
