package keeper

import (
	"testnet/x/aggregation/types"
)

var _ types.QueryServer = Keeper{}
