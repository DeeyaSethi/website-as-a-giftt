# YouTube Playlist Links Needed

Please provide the actual YouTube playlist URLs for each artist/category below. Replace the `PLAYLIST_ID_HERE` placeholders in `lib/predefinedPlaylists.ts`.

## How to Find Playlist IDs:

1. Go to a YouTube playlist
2. Look at the URL: `https://www.youtube.com/playlist?list=PLxxxxxxxxxxx`
3. Copy the part after `list=` (that's the playlist ID)

---

## Bollywood

### 1. Arijit Singh - Romantic Bollywood
- **Current ID:** `PLcIhgbBHGaG9SZnVHkNbZ5s7OPADZKwfR` (PLACEHOLDER)
- **Needed:** Actual Arijit Singh playlist ID
- **Example:** Best of Arijit Singh, Romantic songs, etc.
- **Update in:** `lib/predefinedPlaylists.ts` line ~15

### 2. A.R. Rahman - Legendary Classics
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** A.R. Rahman playlist ID
- **Example:** A.R. Rahman greatest hits, iconic compositions
- **Update in:** `lib/predefinedPlaylists.ts` line ~21

### 3. Shreya Ghoshal - Melodious Hits
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Shreya Ghoshal playlist ID
- **Example:** Best of Shreya Ghoshal
- **Update in:** `lib/predefinedPlaylists.ts` line ~27

---

## Hollywood Pop

### 4. Taylor Swift - Pop Essentials
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Taylor Swift playlist ID
- **Example:** Taylor Swift essentials, greatest hits
- **Update in:** `lib/predefinedPlaylists.ts` line ~35

### 5. Ed Sheeran - Love Songs
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Ed Sheeran playlist ID
- **Example:** Ed Sheeran romantic songs
- **Update in:** `lib/predefinedPlaylists.ts` line ~41

### 6. The Weeknd - R&B Vibes
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** The Weeknd playlist ID
- **Example:** The Weeknd greatest hits
- **Update in:** `lib/predefinedPlaylists.ts` line ~47

---

## K-Pop

### 7. BTS - K-pop Legends
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** BTS playlist ID
- **Example:** BTS greatest hits
- **Update in:** `lib/predefinedPlaylists.ts` line ~55

### 8. BLACKPINK - Girl Power
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** BLACKPINK playlist ID
- **Example:** BLACKPINK hits
- **Update in:** `lib/predefinedPlaylists.ts` line ~61

---

## Other Categories

### 9. Indie Love Songs
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Indie/Alternative love songs playlist ID
- **Example:** Indie love songs, alternative romantic tracks
- **Update in:** `lib/predefinedPlaylists.ts` line ~69

### 10. Timeless Love Songs - Romantic Classics
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Classic romantic songs playlist ID
- **Example:** Classic love songs, romantic ballads through the decades
- **Update in:** `lib/predefinedPlaylists.ts` line ~77

### 11. Ultimate Party Mix - Dance Hits
- **Current ID:** `PLAYLIST_ID_HERE`
- **Needed:** Party/dance music playlist ID
- **Example:** Party hits, dance floor bangers
- **Update in:** `lib/predefinedPlaylists.ts` line ~85

---

## Instructions to Update:

1. Open `lib/predefinedPlaylists.ts`
2. Find each playlist object (use the line numbers above)
3. Replace `PLAYLIST_ID_HERE` or the placeholder with the actual YouTube playlist ID
4. Save the file

Example:
```typescript
// Before:
playlistId: "PLAYLIST_ID_HERE",

// After:
playlistId: "PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf",
```

---

## How This Works:

1. **User creates a music page** during the website creation flow
2. **Step 1:** They choose "pre-made playlist" or "custom links"
3. **Step 2 (if pre-made):** They select an artist from the dropdown
4. **AI maps** the selection to the correct playlist ID
5. **Generated site** embeds the actual YouTube playlist with all songs
6. **Special badge** shows "Curated: [Artist Name]" on the page

---

## Benefits:

✅ Users don't need to search for playlists themselves
✅ Curated, high-quality playlists
✅ Professional and polished experience
✅ Works great for gifts!

Once you provide the playlist links, everything will work automatically!

