import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import PromptLab from './pages/PromptLab.jsx'
import TokenViz from './pages/TokenViz.jsx'
import FehlerLog from './pages/FehlerLog.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="aufgaben/:day" element={<Tasks />} />
          <Route path="prompt-lab" element={<PromptLab />} />
          <Route path="token-viz" element={<TokenViz />} />
          <Route path="fehler-log" element={<FehlerLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
