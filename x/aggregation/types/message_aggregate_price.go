package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAggregatePrice = "aggregate_price"

var _ sdk.Msg = &MsgAggregatePrice{}

func NewMsgAggregatePrice(creator string, timestamp uint64, prices []*PriceInput) *MsgAggregatePrice {
	return &MsgAggregatePrice{
		Creator: creator,
    Timestamp: timestamp,
		Prices:  prices,
	}
}

func (msg *MsgAggregatePrice) Route() string {
	return RouterKey
}

func (msg *MsgAggregatePrice) Type() string {
	return TypeMsgAggregatePrice
}

func (msg *MsgAggregatePrice) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAggregatePrice) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAggregatePrice) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
