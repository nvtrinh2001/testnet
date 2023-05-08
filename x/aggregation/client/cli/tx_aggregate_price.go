package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"testnet/x/aggregation/types"
  "encoding/json"
)

var _ = strconv.Itoa(0)

func CmdAggregatePrice() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "aggregate-price [prices]",
		Short: "Broadcast message aggregate-price",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			var prices []*types.PriceInput

			err = json.Unmarshal([]byte(args[0]), &prices)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAggregatePrice(
				clientCtx.GetFromAddress().String(),
				prices,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
