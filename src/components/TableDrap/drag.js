/*
 * @Descripttion: SCMsafe.com
 * @version: 1.0
 * @Author: wangyang 13718932754
 * @Date: 2022-04-27 14:20:20
 * @LastEditors: wangyang
 * @LastEditTime: 2022-04-28 11:12:24
 */

function maxMin(num) {
  if (num < 120) {
    num = 120
  }
  if (num > 450) {
    num = 450
  }
  return num
}

export const drag = () => {
  setTimeout(() => {
    var elems = document.getElementsByClassName('ant-table-container');
    elems.forEach(elem => {
      try {
        let header = elem.getElementsByClassName('ant-table-header')
        let headerThs = header[0].querySelectorAll('th')
        let headerCol = header[0].querySelectorAll('col')
        let bodyCol = elem.getElementsByClassName('ant-table-body')[0].querySelectorAll('col')
        headerThs.forEach((headerTH, index) => {
          headerTH.onmousedown = e => {
            let eTarget = e.target
            let w = eTarget.offsetWidth
            let clientX = e.clientX
            let l = e.layerX
            if (l < 10) {
              // 左侧10px以内，意味着我想移动左边框
              if (index > 0) {
                headerTH.style.cursor = "col-resize"
                w = headerThs[index - 1].offsetWidth
                document.onmousemove = e => {
                  e.preventDefault()
                  let newWidth = w - (clientX - e.clientX - l)
                  newWidth = maxMin(newWidth)
                  headerCol[index - 1].style.width = newWidth + 'px'
                  bodyCol[index - 1].style.width = newWidth + 'px'
                }
              }
            }
            if (l > w - 10) {
              // 右侧10px以内，意味着我想移动右边框
              headerTH.style.cursor = "col-resize"
              let xz = w - l
              document.onmousemove = e => {
                e.preventDefault()
                let newWidth = w + (e.clientX - clientX - xz)
                newWidth = maxMin(newWidth)
                headerCol[index].style.width = newWidth + 'px'
                bodyCol[index].style.width = newWidth + 'px'
              }
            }
            document.onmouseup = () => {
              document.onmousemove = null
              headerTH.style.cursor = ""
            }
          }
        })
      } catch (err) {
        console.log(elem, '无法拖动表格宽度', err)
      }
    })
  }, 100)
}