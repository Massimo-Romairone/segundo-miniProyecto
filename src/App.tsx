import './App.css'
import Header from './Components/Header/Header'
import MedicamentosSection from './Components/Secciones/Medicamentos/MedicamentosSection'
import ReportesSection from './Components/Secciones/Reportes/ReportesSection'
import ResidentesSection from './Components/Secciones/Residentes/ResidentesSection'


function App() {
  

  return (
    <>
      <Header />
      <ResidentesSection />
      <MedicamentosSection />
      <ReportesSection />
    </> 
  )
}

export default App
