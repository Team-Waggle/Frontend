const KST = 'Asia/Seoul';

export function nowKST(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: KST }));
}

export function startOfDayKST(dateLike: string): Date | null {
  const s = String(dateLike ?? '').trim();
  if (!s) return null;
  const norm = s.replace(/[./]/g, '-');
  const parts = norm.split('-');
  if (parts.length < 3) return null;

  let y = parts[0];
  if (y.length === 2) y = '20' + y;
  const mm = parts[1].padStart(2, '0');
  const dd = parts[2].padStart(2, '0');

  const d = new Date(`${y}-${mm}-${dd}T00:00:00+09:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function isClosedKST(deadline?: string): boolean {
  const start = startOfDayKST(deadline ?? '');
  if (!start) return false;
  return nowKST().getTime() >= start.getTime();
}

export function formatYYMMDDKST(dateLike?: string): string {
  if (!dateLike) return '';
  const d = startOfDayKST(dateLike);
  if (!d) return '';
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}