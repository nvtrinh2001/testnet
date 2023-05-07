package aggregation_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "testnet/testutil/keeper"
	"testnet/testutil/nullify"
	"testnet/x/aggregation"
	"testnet/x/aggregation/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AggregationKeeper(t)
	aggregation.InitGenesis(ctx, *k, genesisState)
	got := aggregation.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
