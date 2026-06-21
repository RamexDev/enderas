/**
 * @fileoverview Editor UI state — which section is being edited, edit-mode
 * toggle (hover outlines), and a per-page data cache so the preview can
 * refresh after saves without re-mounting.
 */

import { create } from 'zustand'

export const useEditorStore = create((set, get) => ({
  /** When non-null, the EditDrawer is open with this section + record. */
  activeEdit: null, // { section, record, pageKey } | null

  /** When true, hovering an EditOverlay shows the dashed gold ring + button. */
  editMode: true,

  /** Per-page cache of the latest preview data. Keyed by page key. */
  pageCache: {},
  /** Per-page reload counter. Bumping forces preview pages to refetch. */
  pageReloadToken: {},

  openEdit: (section, record, pageKey) =>
    set({ activeEdit: { section, record, pageKey } }),

  /** Opens the drawer for a collection section directly in "add new" form
   *  mode — skips the list view entirely. */
  openNewRecord: (section, pageKey) =>
    set({ activeEdit: { section, record: { __isNew: true }, pageKey } }),

  closeEdit: () => set({ activeEdit: null }),

  setEditMode: (on) => set({ editMode: on }),

  setPageCache: (pageKey, data) =>
    set((state) => ({
      pageCache: { ...state.pageCache, [pageKey]: data },
    })),

  bumpReload: (pageKey) =>
    set((state) => ({
      pageReloadToken: {
        ...state.pageReloadToken,
        [pageKey]: (state.pageReloadToken[pageKey] || 0) + 1,
      },
    })),

  getReloadToken: (pageKey) => get().pageReloadToken[pageKey] || 0,
}))
