import {AbsoluteCellRange} from '../AbsoluteCellRange'
import {CellValue, SimpleCellAddress} from '../Cell'
import {ColumnsSpan} from '../ColumnsSpan'
import {Config} from '../Config'
import {DependencyGraph} from '../DependencyGraph'
import {Matrix} from '../Matrix'
import {Statistics} from '../statistics/Statistics'
import {ColumnBinarySearch} from './ColumnBinarySearch'
import {ColumnIndex} from './ColumnIndex'

export interface IColumnSearchStrategy {
  add(value: CellValue | Matrix, address: SimpleCellAddress): void

  remove(value: CellValue | Matrix | null, address: SimpleCellAddress): void

  change(oldValue: CellValue | Matrix | null, newValue: CellValue | Matrix, address: SimpleCellAddress): void

  addColumns(columnsSpan: ColumnsSpan): void

  removeColumns(columnsSpan: ColumnsSpan): void

  removeSheet(sheetId: number): void

  moveValues(range: IterableIterator<[CellValue, SimpleCellAddress]>, toRight: number, toBottom: number, toSheet: number): void

  removeValues(range: IterableIterator<[CellValue, SimpleCellAddress]>): void

  find(key: any, range: AbsoluteCellRange, sorted: boolean): number

  destroy(): void
}

export function buildColumnSearchStrategy(dependencyGraph: DependencyGraph, config: Config, statistics: Statistics): IColumnSearchStrategy {
  if (config.useColumnIndex) {
    return new ColumnIndex(dependencyGraph, config, statistics)
  } else {
    return new ColumnBinarySearch(dependencyGraph, config)
  }
}
