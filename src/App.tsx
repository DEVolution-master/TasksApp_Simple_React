import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  // Declaración de tipo de dato

  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]); // Lista de tareas donde se guardarán las tareas nuevas
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus(); //Cuando termine de añadir una tarea, llama a la variable taskInput
  };

  const addTask = (name: string): void => {
    // Recibe una nueva tarea de tipo string
    // Void. Le decimos a la función que va a retornar algo, en este caso no retorna nada (void).
    const newTasks: ITask[] = [...tasks, { name, done: false }]; // Copia el contenido actual de las tareas y añade uno nuevo. Definimos el objeto de la tarea.
    setTasks(newTasks); // Establece la función en el Estado setTasks
  };

  const toggleDoneTask = (i: number): void => {
    // Cambia la funcionalidad de la tarea a hecha o no. de Verdad a falso o de F a V. Actualiza el estado por el contrario. Para ello, copia de nuevo todas las tareas del arreglo.
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done; // Actualiza el valor de V a F
    setTasks(newTasks); // Guardamos el nuevo valor en el estado set
  };

  const removeTask = (i: number): void => {
    // Para eliminar una tarea tenemos que saber donde está, a través del índice la identificamos
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1); // De las tareas del arreglo que le hemos pasado voy a quitar 1 tarea, en el índice que le estén pasando
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput} //useRef, para que el cursor vuelva a aparecer automáticamente en el input al añadir o quitar una tarea
                  autoFocus //El cursor se situa en el input directamente cuando recargas la pág
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-success mt-2">Save</button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✘" : "✔"}
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => removeTask(i)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
