import { Dec, Int, LCDClient } from "@terra-money/terra.js";
import { AddressProvider } from "../../address-provider/types";

interface Option {
  lcd: LCDClient;
  contractAddr: string;
  amount: string;
}
interface SimulationResponse {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
}

export const queryReverseTokenSimulation = ({
  lcd,
  contractAddr,
  amount,
}: Option) => async (
  addressProvider: AddressProvider.Provider
): Promise<SimulationResponse> => {
  const pairContractAddress = addressProvider.terraswapPair();
  let reponse: SimulationResponse = await lcd.wasm.contractQuery(
    pairContractAddress,
    {
      reverse_simulation: {
        ask_asset: {
          info: {
            token: {
              contract_addr: contractAddr,
            },
          },
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      },
    }
  );
  return reponse;
};