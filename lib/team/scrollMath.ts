export const SCROLL_PER_MEMBER = 1100;
export const HEADER_EXIT_DURATION = 0.07;
export const ENTER_SHARE = 0.07;
export const EXIT_SHARE = 0.07;

export function getScrollDistance(memberCount: number) {
  return memberCount * SCROLL_PER_MEMBER;
}

export function getActiveMemberState(animProgress: number, total: number) {
  const slot = 1 / total;
  const index = Math.min(total - 1, Math.floor(animProgress / slot));
  const local = (animProgress - index * slot) / slot;
  return { index, local: Math.min(1, Math.max(0, local)) };
}

export function getFrameProgress(local: number) {
  const holdStart = ENTER_SHARE;
  const holdEnd = 1 - EXIT_SHARE;
  if (local <= holdStart) return 0;
  if (local >= holdEnd) return 1;
  return (local - holdStart) / (holdEnd - holdStart);
}

export function getContentTiming(memberCount: number) {
  const contentStart = HEADER_EXIT_DURATION;
  const contentDuration = 1 - contentStart;
  const segment = contentDuration / memberCount;
  const enterDuration = segment * ENTER_SHARE;
  const exitDuration = segment * EXIT_SHARE;

  return {
    contentStart,
    contentDuration,
    segment,
    enterDuration,
    exitDuration,
  };
}
