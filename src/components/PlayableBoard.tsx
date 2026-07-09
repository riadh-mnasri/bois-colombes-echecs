"use client";

import { useState } from "react";
import { Chess, type Square } from "chess.js";

const WHITE_GLYPHS: Record<string, string> = {
  p: "♙",
  n: "♘",
  b: "♗",
  r: "♖",
  q: "♕",
  k: "♔",
};

const BLACK_GLYPHS: Record<string, string> = {
  p: "♟",
  n: "♞",
  b: "♝",
  r: "♜",
  q: "♛",
  k: "♚",
};

function statusText(game: Chess) {
  if (game.isCheckmate()) {
    return `Échec et mat : les ${game.turn() === "w" ? "Noirs" : "Blancs"} gagnent.`;
  }
  if (game.isStalemate()) return "Pat, partie nulle.";
  if (game.isDraw()) return "Partie nulle.";
  if (game.inCheck()) return `Échec aux ${game.turn() === "w" ? "Blancs" : "Noirs"} !`;
  return `Trait aux ${game.turn() === "w" ? "Blancs" : "Noirs"}.`;
}

export function PlayableBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<Square | null>(null);

  const board = game.board();

  const legalTargets = selected
    ? new Set(game.moves({ square: selected, verbose: true }).map((m) => m.to))
    : new Set<string>();

  function handleSquareClick(square: Square) {
    if (game.isGameOver()) return;
    const piece = game.get(square);

    if (selected) {
      if (legalTargets.has(square)) {
        const next = new Chess(game.fen());
        try {
          next.move({ from: selected, to: square, promotion: "q" });
        } catch {
          // illegal, ignore
        }
        setGame(next);
        setSelected(null);
        return;
      }
      if (piece && piece.color === game.turn()) {
        setSelected(square);
        return;
      }
      setSelected(null);
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelected(square);
    }
  }

  function handleReset() {
    setGame(new Chess());
    setSelected(null);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid aspect-square w-full max-w-[420px] grid-cols-8 overflow-hidden rounded-xl border border-line shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const square = `${"abcdefgh"[colIndex]}${8 - rowIndex}` as Square;
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const isSelected = selected === square;
            const isTarget = legalTargets.has(square);
            const glyph = cell ? (cell.color === "w" ? WHITE_GLYPHS : BLACK_GLYPHS)[cell.type] : null;

            return (
              <button
                key={square}
                type="button"
                onClick={() => handleSquareClick(square)}
                className={`relative flex aspect-square items-center justify-center text-3xl transition-colors sm:text-4xl ${
                  isLight ? "bg-paper-dim" : "bg-wood"
                } ${isSelected ? "ring-4 ring-inset ring-gold" : ""}`}
                aria-label={`Case ${square}${cell ? `, ${cell.color === "w" ? "blanc" : "noir"} ${cell.type}` : ""}`}
              >
                {glyph && (
                  <span
                    className={
                      cell?.color === "w"
                        ? "text-paper drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                        : "text-ink-soft"
                    }
                  >
                    {glyph}
                  </span>
                )}
                {isTarget && !cell && <span className="absolute h-3 w-3 rounded-full bg-gold/70" />}
                {isTarget && cell && <span className="absolute inset-1 rounded-md ring-4 ring-gold/70" />}
              </button>
            );
          })
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <p className="text-sm font-medium text-paper/85">{statusText(game)}</p>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-paper/30 px-4 py-1.5 text-sm text-paper/85 transition-colors hover:bg-paper/10"
        >
          Nouvelle partie
        </button>
      </div>
    </div>
  );
}
