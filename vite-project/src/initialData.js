const LSKEY = "MyTodoList.tasks";
const getInitialTasks = () => {
   const saveTasks = localStorage.getItem(LSKEY);
   return saveTasks ? JSON.parse(saveTasks) :
      [
         { id: '69915276-18d7-4d03-bc0c-7ca25023364c', name: "Welcome", done: false },
         { id: '6bd6456a-a073-403d-9dc2-97091a4e6240', name: "Have fun!", done: true }
      ]
}

export default getInitialTasks;