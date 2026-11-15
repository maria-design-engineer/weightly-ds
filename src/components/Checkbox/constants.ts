/**
 * Ось Size кита — 3 значения: `m` коробка 14, `l` 17, `xl` 24.
 * Профиль: ui-kit/components/checkbox.md
 *
 * В продукте берётся только `m` — профиль, раздел «Роли в продукте».
 */
export const CHECKBOX_SIZES = ['m', 'l', 'xl'] as const

export type CheckboxSize = (typeof CHECKBOX_SIZES)[number]

/*
 * Галочка и черта — свои у каждого размера, сняты с мастеров набора `53103:9376`
 * 15.11.2026: вектор `check` и прямоугольник `brick`. Пропорции галочки у размеров
 * разные, поэтому путь не масштабируется, а берётся свой.
 */
export const CHECKBOX_MARKS: Record<
  CheckboxSize,
  { check: { width: number; height: number; path: string }; brick: { width: number; height: number } }
> = {
  m: {
    check: {
      width: 10,
      height: 7,
      path: 'M8.4978 0L10 1.4254L4.0364 7L0 3.1701L1.5022 1.7448L4.0364 4.1493L8.4978 0Z',
    },
    brick: { width: 8, height: 3 },
  },
  l: {
    check: {
      width: 11,
      height: 9,
      path: 'M9.5637 0L11 1.5071L3.8592 9L0 4.9505L1.4363 3.4434L3.8592 5.9858L9.5637 0Z',
    },
    brick: { width: 10, height: 3 },
  },
  xl: {
    check: {
      width: 15.5294,
      height: 12.7059,
      path: 'M13.5017 0L15.5294 2.1277L5.4483 12.7059L0 6.9889L2.0277 4.8612L5.4483 8.4505L13.5017 0Z',
    },
    brick: { width: 14.1176, height: 4.2353 },
  },
}
