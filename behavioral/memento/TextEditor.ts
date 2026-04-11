// ─── Memento ───────────────────────────────────────────────────────────────

class Memento<T> {
  private readonly state: T;
  private readonly timestamp: Date;
  private readonly label: string;

  constructor(state: T, label: string = '') {
    this.state = structuredClone(state);
    this.timestamp = new Date();
    this.label = label;
  }

  public getState(): T {
    return structuredClone(this.state);
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getLabel(): string {
    return this.label;
  }
}


class History<T> {
  private undoStack: Memento<T>[] = [];
  private redoStack: Memento<T>[] = [];
  private readonly maxSize: number;

  constructor(maxSize = 50) {
    this.maxSize = maxSize;
  }

  /**
   * Call this BEFORE applying a change to the originator,
   * passing in the state snapshot you just captured.
   */
  public push(memento: Memento<T>): void {
    this.undoStack.push(memento);

    // Enforce capacity limit (drop the oldest entry)
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    // Any new action invalidates the redo branch
    this.redoStack = [];
  }

  /**
   * Returns the previous state and moves current onto the redo stack.
   * Caller must supply the *current* memento so redo can return to it.
   */
  public undo(currentMemento: Memento<T>): Memento<T> | null {
    if (this.undoStack.length === 0) return null;

    this.redoStack.push(currentMemento);
    return this.undoStack.pop()!;
  }

  /**
   * Returns the next state and moves current onto the undo stack.
   */
  public redo(currentMemento: Memento<T>): Memento<T> | null {
    if (this.redoStack.length === 0) return null;

    this.undoStack.push(currentMemento);
    return this.redoStack.pop()!;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** Snapshot of every label in the undo stack (oldest → newest) */
  public getUndoHistory(): string[] {
    return this.undoStack.map(m => m.getLabel());
  }

  /** Snapshot of every label in the redo stack (most-recent-undo first) */
  public getRedoHistory(): string[] {
    return [...this.redoStack].reverse().map(m => m.getLabel());
  }

  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}


class TextEditor {
  private content: string;
  private history: History<string>;

  constructor(maxHistory = 50) {
    this.content = '';
    this.history = new History<string>(maxHistory);
  }



  private snapshot(label: string): Memento<string> {
    return new Memento(this.content, label);
  }

  private saveToHistory(label: string): void {
    this.history.push(this.snapshot(label));
  }



  public write(text: string): void {
    this.saveToHistory(`before write: "${text}"`);
    this.content += text;
  }

  public delete(chars: number): void {
    this.saveToHistory(`before delete ${chars} chars`);
    this.content = this.content.slice(0, -chars);
  }

  public replace(search: string, replacement: string): void {
    this.saveToHistory(`before replace "${search}" → "${replacement}"`);
    this.content = this.content.replace(search, replacement);
  }

  public clear(): void {
    this.saveToHistory('before clear');
    this.content = '';
  }

  public undo(): boolean {
    const previous = this.history.undo(this.snapshot('redo point'));
    if (!previous) return false;
    this.content = previous.getState();
    return true;
  }

  public redo(): boolean {
    const next = this.history.redo(this.snapshot('undo point'));
    if (!next) return false;
    this.content = next.getState();
    return true;
  }


  public getContent(): string {
    return this.content;
  }

  public canUndo(): boolean {
    return this.history.canUndo();
  }

  public canRedo(): boolean {
    return this.history.canRedo();
  }

  public getUndoHistory(): string[] {
    return this.history.getUndoHistory();
  }

  public getRedoHistory(): string[] {
    return this.history.getRedoHistory();
  }
}


const editor = new TextEditor();

editor.write('Hello');
editor.write(', World');
editor.write('!');
console.log(editor.getContent());        

editor.undo();
console.log(editor.getContent());

editor.undo();
console.log(editor.getContent());

console.log(editor.canRedo());
editor.redo();
console.log(editor.getContent());

editor.write(' — overwritten');
console.log(editor.canRedo());
console.log(editor.getContent());

console.log('Undo history:', editor.getUndoHistory());
