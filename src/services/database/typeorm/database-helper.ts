import { addDays } from "date-fns";
import { Between, LessThanOrEqual, MoreThan, QueryRunner } from "typeorm";

export const startTypeormTransaction = async (queryRunner: QueryRunner, func: any) => {

  // establish real database connection using our new query runner
  await queryRunner.connect();

  // lets now open a new transaction:
  await queryRunner.startTransaction();

  try {

    await func()
    // commit transaction now:
    await queryRunner.commitTransaction();
  } catch (err) {

    // since we have errors let's rollback changes we made
    await queryRunner.rollbackTransaction();
    throw err
  } finally {

    // you need to release query runner which is manually created:
    await queryRunner.release();
  }
}


export const queryDbByDateFilter = (query: { from?: string, to?: string }, dateField: string = 'createdAt') => {
  const to = query.to ? new Date(addDays(new Date(query.to), 1)) : query.to
  const from = query.from ? new Date(query.from) : query.from

  if (to && !from) return { [dateField]: LessThanOrEqual(to) }
  if (!to && from) return { [dateField]: MoreThan(from) }
  if (to && from) return { [dateField]: Between(from, to) }

  return {}

}

export const queryDbByPriceRangeFilter = (query: { priceFrom?: number, priceTo?: number }, priceField: string = 'price') => {
  const priceFrom = query.priceFrom
  const priceTo = query.priceTo

  if (priceTo && !priceFrom) return { [priceField] : LessThanOrEqual(priceTo) }
  if (!priceTo && priceFrom) return { [priceField] : MoreThan(priceFrom) }
  if (priceFrom && priceTo) return { [priceField] : Between(priceFrom, priceTo) }

  return {}
}

export const queryDbByEventDateFilter = (query: { eventFrom?: string, eventTo?: string }, eventDateField: string = 'date') => {
  const eventTo = query.eventTo ? new Date(addDays(new Date(query.eventTo), 1)) : query.eventTo
  const eventFrom = query.eventFrom ? new Date(query.eventFrom) : query.eventFrom

  if (eventTo && !eventFrom) return { [eventDateField]: LessThanOrEqual(eventTo) }
  if (!eventTo && eventFrom) return { [eventDateField]: MoreThan(eventFrom) }
  if (eventTo && eventFrom) return { [eventDateField]: Between(eventFrom, eventTo) }

  return {}

}

// export const walletAggregationBuilder