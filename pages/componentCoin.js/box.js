export default function Box(props) {
  const { name } = props;
  const {name1} = props;
  return (
    <div>
      <table class="text-center ">
      <thead class="border-b bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-100 text-xl justify-items-center">
       
        </thead>
        <tbody>
          <tr>
            <th  class="font-medium  px-6 py-4 border-r">
              <p> {name} </p>
            </th>
            <th class="font-medium  px-6 py-4 border-r">
              <p> {name}{name1}</p>
            </th>
          </tr>
        </tbody>
      </table>
   
    </div>
  );
}
