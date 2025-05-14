import "bootstrap/dist/css/bootstrap.min.css" 
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router"
import ListBoard from "./components/ListBoard"
import AddBoard from "./components/AddBoard"
import DetailBoard from "./components/DetailBoard"
import BoardEdit from "./components/BoardEdit"
import BoardDelete from "./components/BoardDelete"
import ChatSearch from './components/ChatSearch';

const App = () => {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListBoard />} />
          <Route path="/addBoard" element={<AddBoard />} />
          <Route path="/detail/:id" element={<DetailBoard />} />
          <Route path="/edit/:id" element={<BoardEdit />} />
          <Route path="/delete/:id" element={<BoardDelete />} />
          <Route path="/search_gpt" element={<ChatSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App