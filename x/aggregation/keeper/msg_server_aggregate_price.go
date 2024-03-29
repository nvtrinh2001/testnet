package keeper

import (
	"context"

	"testnet/x/aggregation/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) AggregatePrice(goCtx context.Context, msg *types.MsgAggregatePrice) (*types.MsgAggregatePriceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var sources string
	var priceSum uint64
	for _, price := range msg.Prices {
		sources += price.Source + ", "
		priceSum += price.Price
	}
  sources = sources[:len(sources)-2]

	var price = types.Price{
		Creator: msg.Creator,
		Source:  sources,
		Price:   priceSum / uint64(len(msg.Prices)),
    Timestamp: msg.Timestamp,
	}
	id := k.AppendPrice(
		ctx,
		price,
	)
	return &types.MsgAggregatePriceResponse{
		Id: id,
	}, nil
}
