import Home from "./Home";
import Resource from "./Resource";
import { Route, Switch } from "wouter";

function App() {
  return (
    <div className="bg-gray-100 h-full">
      <div className="flex flex-col mx-auto max-w-xl p-6 bg-gray-50 h-full rounded-lg">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/resources/:mediaType/:id" component={Resource} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
