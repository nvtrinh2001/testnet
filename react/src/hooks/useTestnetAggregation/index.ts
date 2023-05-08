/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useTestnetAggregation() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.TestnetAggregation.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryShowPrice = (id: string,  options: any) => {
    const key = { type: 'QueryShowPrice',  id };    
    return useQuery([key], () => {
      const { id } = key
      return  client.TestnetAggregation.query.queryShowPrice(id).then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QueryShowPrice,
  }
}