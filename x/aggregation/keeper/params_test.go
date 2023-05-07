package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "testnet/testutil/keeper"
	"testnet/x/aggregation/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.AggregationKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
