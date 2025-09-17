// DO NOT DELETE

import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const appName = "Dogアプリ";

  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1 className="brand">{appName}</h1>
        </div>
    </header>
    <main className = "container">
      <p>Dogアプリ</p>
    </main>
    </>
  )
}
