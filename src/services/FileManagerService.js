export class FileManagerService {
  createJsonFile (filename, json) {
    const element = document.createElement('a')
    element.setAttribute('href',
      'data:application/json;charset=utf-8,' + encodeURIComponent(json))
    element.setAttribute('download', `${filename}.json`)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }
}
