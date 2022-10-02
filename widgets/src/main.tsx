import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { WidgetsRouterProvider } from "./providers/WidgetsRouterProvider"

import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WidgetsRouterProvider>
            <App />
        </WidgetsRouterProvider>
    </React.StrictMode>,
)
