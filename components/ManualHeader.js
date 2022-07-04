// This file is to show what making a connect button looks like behind the scenes!

import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
            }
        }
    }, [isWeb3Enabled])
    // no array, run on every render
    // empty array, run once
    // dependency array, run when the stuff in it changesan

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account change to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to{account.slice(0, 6)}.....{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        // await walletModal.connect()
                        await enableWeb3()
                        // depends on what button they picked
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                            // window.localStorage.setItem("connected", "walletconnect")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
