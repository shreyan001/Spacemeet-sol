import { FC } from 'react'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export const AppBar: FC = () => {
    return (
        <div>
            <WalletMultiButton/>
        </div>
    )
}