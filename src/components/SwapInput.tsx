import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs'
import TokenModal from './TokenModal';


const SwapInput = ({title, value, pos, setToken, num, updateNum}: {title: string, value: Record<any, any> | null, pos: number, setToken: Function, num: number, updateNum: Function}) => {

    const [showModal, setShowModal] = useState(false);

    const tokenSelected = (token: Record<any, any>) => {
        // Dispatch state change event
        setToken(token, pos)
        setShowModal(false)
    }

    return (

        <div className="mt-4 bg-primary-800 p-4 rounded-lg">
        <div className="md:grid md:grid-cols-5">
            <div className="col-span-2 grid grid-flow-col gap-4 justify-start items-center">
                { value ? 
                    <img src={value.logoURI} className="w-14 h-14 rounded-md" alt="" /> :
                    <div className="w-14 h-14 rounded-md bg-background"></div>
                }
                <div role="button" tabIndex={0} onClick={() => {setShowModal(true)}}>
                    {/* <button> */}
                        <p className="text-xs text-type-200">{title}</p>
                        { value ? 
                        <span className="text-2xl text-type-200 font-bold grid grid-flow-col items-center gap-1">
                            <span>{value.symbol}</span>
                            <BsChevronDown className="text-type-200" size="16" />
                        </span> :
                        <p className="text-xs text-type-100 border-type-300 border rounded-full px-2 py-1 mt-1">Select token</p>          
                        }
                </div>
            </div>
            <div className="col-span-3 mt-3 md:mt-0">
                {/* https://stackoverflow.com/a/58097342/6513036 and https://stackoverflow.com/a/62275278/6513036 */}
                <input onChange={(e) => updateNum(e.target.value)} onWheel={ event => event.currentTarget.blur() } onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} type="number" className="h-full w-full rounded-lg bg-primary-900 text-3xl px-2 outline-none focus:placeholder-type-200 placeholder-type-400" placeholder="0.0" value={num} />
            </div>
        </div>
        {showModal ? <TokenModal onClick={tokenSelected} close={() => setShowModal(false)} /> : <></> }
    </div>
    )
}

export default SwapInput
