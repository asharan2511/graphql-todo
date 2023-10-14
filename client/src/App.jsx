import { useQuery, gql } from "@apollo/client";

const query = gql`
  query gettodos {
    getTodos {
      id
      title
      completed
      userId
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(query);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="app">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
