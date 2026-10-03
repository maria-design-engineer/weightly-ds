/*
 * Высота клавиатуры, закрывающей окно снизу.
 *
 * Клавиатура телефона окно не ужимает — она ложится поверх него. Из-за этого
 * шторка, прибитая к низу окна, остаётся под ней вместе со своими кнопками:
 * на iPhone кнопку «Добавить» закрывала ещё и системная плашка со стрелками,
 * на Android она уходила под клавиатуру целиком. Баг `sheet-button-under-keyboard`.
 *
 * Сколько именно закрыто, знает только `visualViewport` — видимая часть окна.
 * Её высота уже учитывает и клавиатуру, и плашку над ней. Значение кладётся
 * переменной `--w-keyboard-inset` на корень документа, а стили шторки поднимают
 * её на эту высоту.
 */

/** Сколько шторок сейчас открыто: слежение снимается, когда закрылась последняя. */
let watchers = 0
let stop: (() => void) | null = null

const VARIABLE = '--w-keyboard-inset'

function apply() {
  const view = window.visualViewport
  if (!view) return
  /*
   * Снизу закрыто ровно столько, сколько осталось от окна после видимой части
   * и её сдвига. Отрицательных значений не бывает: страницу можно увеличить
   * пальцем, и тогда видимая часть меньше окна без всякой клавиатуры.
   */
  const hidden = window.innerHeight - view.height - view.offsetTop
  const inset = Math.max(0, Math.round(hidden))
  document.documentElement.style.setProperty(VARIABLE, `${inset}px`)
}

/**
 * Следить за клавиатурой, пока шторка открыта. Возвращает отписку.
 * Браузер без `visualViewport` остаётся как был: переменная не ставится,
 * шторка стоит по низу окна.
 */
export function watchKeyboardInset(): () => void {
  if (typeof window === 'undefined' || !window.visualViewport) return () => {}

  if (watchers === 0) {
    const view = window.visualViewport
    view.addEventListener('resize', apply)
    /* Прокрутка страницы при открытой клавиатуре двигает видимую часть. */
    view.addEventListener('scroll', apply)
    stop = () => {
      view.removeEventListener('resize', apply)
      view.removeEventListener('scroll', apply)
      document.documentElement.style.removeProperty(VARIABLE)
    }
  }
  watchers += 1
  apply()

  return () => {
    watchers -= 1
    if (watchers > 0) return
    stop?.()
    stop = null
  }
}
