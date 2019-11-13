import {HyperFormula} from '../../src'
import {CellError, ErrorType} from '../../src/Cell'
import {adr} from '../testUtils'
import '../testConfig'

describe('Text', () => {
  it('works',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '2',
      '=TEXT(A1, "mm/dd/yyyy")',
    ]])

    expect(engine.getCellValue(adr('B1'))).toEqual('01/01/1900')
  })

  it('wrong number of arguments',  () => {
    const engine =  HyperFormula.buildFromArray([
      ['=TEXT(42)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(new CellError(ErrorType.NA))
  })

  it('wrong format argument',  () => {
    const engine =  HyperFormula.buildFromArray([
      ['=TEXT(2, 42)'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(new CellError(ErrorType.VALUE))
  })

  xit('wrong date argument',  () => {
    const engine =  HyperFormula.buildFromArray([
      ['=TEXT(TRUE(), "mm/dd/yyyy")'],
    ])

    expect(engine.getCellValue(adr('A1'))).toEqual(new CellError(ErrorType.VALUE))
  })

  it('day formats',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "d d")',
      '=TEXT(A1, "dd DD")',
      '=TEXT(A1, "ddd DDD")',
      '=TEXT(A1, "dddd DDDD")',
    ]])

    expect(engine.getCellValue(adr('B1'))).toEqual('8 8')
    expect(engine.getCellValue(adr('C1'))).toEqual('08 08')
    expect(engine.getCellValue(adr('D1'))).toEqual('Wed Wed')
    expect(engine.getCellValue(adr('E1'))).toEqual('Wednesday Wednesday')
  })

  it('month formats',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "m M")',
      '=TEXT(A1, "mm MM")',
      '=TEXT(A1, "mmm MMM")',
      '=TEXT(A1, "mmmm MMMM")',
      '=TEXT(A1, "mmmmm MMMMM")',
    ]])

    expect(engine.getCellValue(adr('B1'))).toEqual('8 8')
    expect(engine.getCellValue(adr('C1'))).toEqual('08 08')
    expect(engine.getCellValue(adr('D1'))).toEqual('Aug Aug')
    expect(engine.getCellValue(adr('E1'))).toEqual('August August')
    expect(engine.getCellValue(adr('F1'))).toEqual('A A')
  })

  it('year formats',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "yy YY")',
      '=TEXT(A1, "yyyy YYYY")',
    ]])

    expect(engine.getCellValue(adr('B1'))).toEqual('18 18')
    expect(engine.getCellValue(adr('C1'))).toEqual('2018 2018')
  })

  it('12 hours',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "hh:mm AM/PM")',
    ]])
    expect(engine.getCellValue(adr('B1'))).toEqual('12:00 AM')
  })

  it('24 hours',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "HH:mm")',
    ]])
    expect(engine.getCellValue(adr('B1'))).toEqual('00:00')
  })

  it('distinguishes between months and minutes',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '=DATE(2018, 8, 8)',
      '=TEXT(A1, "mm")',
      '=TEXT(A1, "HH:mm")',
      '=TEXT(A1, "H:m")',
      '=TEXT(A1, "h:M")',
    ]])
    expect(engine.getCellValue(adr('B1'))).toEqual('08')
    expect(engine.getCellValue(adr('C1'))).toEqual('00:00')
    expect(engine.getCellValue(adr('D1'))).toEqual('0:0')
    expect(engine.getCellValue(adr('E1'))).toEqual('12:0')
  })

  it('works for number format',  () => {
    const engine =  HyperFormula.buildFromArray([[
      '12.45',
      '=TEXT(A1, "###.###")',
      '=TEXT(A1, "000.000")',
    ]])

    expect(engine.getCellValue(adr('B1'))).toEqual('12.45')
    expect(engine.getCellValue(adr('C1'))).toEqual('012.450')
  })

})
