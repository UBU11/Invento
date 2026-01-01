

export default function HistoryText({text}: {text?: string}) {

  return(

    <div className=" relative min-w-screen min-h-screen flex justify-center items-center">
        <h1 className="text-6xl font-bold text-gray-800">{text}</h1>
      </div>

  )
}
