import { describe, expect, it, vi } from 'vitest'

// Mock SvelteKit paths module before importing search
vi.mock('$app/paths', () => ({
  base: '',
}))

import { collapseIndexes, search } from '../src/lib/search'

describe('search utilities', () => {
  describe('collapseIndexes', () => {
    it('should handle empty indexes', () => {
      expect(collapseIndexes([])).toEqual([])
    })

    it('should handle non-overlapping indexes', () => {
      expect(
        collapseIndexes([
          [0, 2],
          [5, 7],
        ]),
      ).toEqual([
        [0, 2],
        [5, 7],
      ])
    })

    it('should collapse overlapping indexes', () => {
      expect(
        collapseIndexes([
          [0, 3],
          [2, 5],
        ]),
      ).toEqual([[0, 5]])
    })

    it('should collapse adjacent indexes', () => {
      expect(
        collapseIndexes([
          [0, 2],
          [2, 4],
        ]),
      ).toEqual([[0, 4]])
    })
  })

  describe('search function', () => {
    it('should return search results without throwing errors', () => {
      const results = search('something')
      expect(results).toBeInstanceOf(Array)
    })
  })
})
