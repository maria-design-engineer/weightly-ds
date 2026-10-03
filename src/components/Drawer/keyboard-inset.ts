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

/**
 * Запас на системную панель над клавиатурой iPhone — ту, где стрелки «вверх-вниз»
 * и галочка. В видимую часть окна она не входит: шторка вставала ровно над
 * клавиатурой, а панель ложилась поверх её кнопок. Находка пользователя 03.10.2026,
 * снимок в `bugs/sheet-button-under-keyboard`.
 *
 * Высота панели у Apple постоянная — 44 точки. Своей величины здесь нет: это размер
 * системного элемента, а не продукта. Клавиатуры нет — запас не ставится.
 */
const KEYBOARD_BAR = 44

function apply() {
  const view = window.visualViewport
  if (!view) return
  /*
   * Снизу закрыто ровно столько, сколько осталось от окна после видимой части
   * и её сдвига. Отрицательных значений не бывает: страницу можно увеличить
   * пальцем, и тогда видимая часть меньше окна без всякой клавиатуры.
   */
  const hidden = window.innerHeight - view.height - view.offsetTop
  const keyboard = Math.max(0, Math.round(hidden))
  /* Клавиатура открыта — поднимаем ещё и над панелью с её стрелками. */
  const inset = keyboard > 0 ? keyboard + KEYBOARD_BAR : 0
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
