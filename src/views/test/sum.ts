// 这是一个固定不变的东西
export let plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' }
}
export let invoices = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55
      },
      {
        playID: 'as-like',
        audience: 35
      },
      {
        playID: 'othello',
        audience: 40
      }
    ]
  }
]

export function statement(invoice) {
  let result = `Statement for ${invoice.customer}\n`
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience
      } seats)\n`
  }

  result += `Amount owed is ${usd(totalAmount(invoice))}\n`
  result += `You earned ${totalVolumeCredits(invoice)} credits\n`
  return result
}

function totalAmount(invoice) {
  let result = 0
  for (let perf of invoice.performances) {
    result += amountFor(perf)
  }
  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
}

function totalVolumeCredits(invoice) {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function volumeCreditsFor(perf: any) {
  let result = 0;
  result += Math.max(perf.audience - 30, 0)
  // add extra credit for every ten comedy attendees
  if ('comedy' === playFor(perf).type)
    result += Math.floor(perf.audience / 5)
  return result
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerformance: any) {
  let result = 0
  switch (playFor(aPerformance).type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`)
  }
  return result
}
