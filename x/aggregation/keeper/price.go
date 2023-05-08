package keeper

import (
	"encoding/binary"

	"testnet/x/aggregation/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) AppendPrice(ctx sdk.Context, price types.Price) uint64 {
	count := k.GetPriceCount(ctx)
	price.Id = count
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PriceKey))
	appendedValue := k.cdc.MustMarshal(&price)
	store.Set(GetPriceIDBytes(price.Id), appendedValue)
	k.SetPriceCount(ctx, count+1)
	return count
}

func (k Keeper) GetPriceCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.PriceCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

func GetPriceIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

func (k Keeper) SetPriceCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.PriceCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

func (k Keeper) GetPrice(ctx sdk.Context, id uint64) (val types.Price, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PriceKey))
	b := store.Get(GetPriceIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

func (k Keeper) SetPrice(ctx sdk.Context, price types.Price) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PriceKey))
	b := k.cdc.MustMarshal(&price)
	store.Set(GetPriceIDBytes(price.Id), b)
}
