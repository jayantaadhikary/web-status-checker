import NavBar from "./components/NavBar";
import InputForm from "./components/Form";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="text-center" style={{ padding: 20 }}>
        <h4>Check if a website is broken!</h4>
        <h6>
          This website was made using Golang for the backend and React for the
          frontend ❤️
        </h6>
      </div>
      <InputForm />
      <footer style={{ textAlign: "center", paddingTop: 8 }}>
        ©2023, Jayanta Adhikary
      </footer>
    </div>
  );
}

export default App;
