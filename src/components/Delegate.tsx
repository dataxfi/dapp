import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import VPmodal from './VPmodal';

export default function Deligate() {
  const { provider, accountId } = useContext(GlobalContext);
  const GlobalValues = useContext(GlobalContext);

  useEffect(() => {
    console.log('provider is', provider);
  }, [provider]);

  useEffect(() => {
    console.log('global values', GlobalValues);
  }, [GlobalValues]);

  return (
    <>
    
        <VPmodal />
   
    </>
  );
}
