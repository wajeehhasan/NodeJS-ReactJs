import { LiveVideo } from "./svg";

function App() {
  const get = async () => {
    const res = await fetch("http://localhost:8000");
    console.log(res);
  };
  get();
  return <div>FrontEnd React Fbclone</div>;
}

export default App;
