import { keywords } from "./keywords";

interface TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;
    keyword?: string;
    failureLink?: TrieNode;
  }
  
  class AhoCorasick {
    private root: TrieNode = { children: {}, isEndOfWord: false };
  
    constructor(keywords: string[]) {
      keywords.forEach((keyword) => this.insert(keyword));
      this.buildFailureLinks();
    }
  
    private insert(keyword: string): void {
      let node = this.root;
      for (const char of keyword) {
        if (!node.children[char]) {
          node.children[char] = { children: {}, isEndOfWord: false };
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
      node.keyword = keyword;
    }
  
    private buildFailureLinks(): void {
      const queue: TrieNode[] = [];
      Object.values(this.root.children).forEach((node) => {
        node.failureLink = this.root;
        queue.push(node);
      });
  
      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        Object.keys(currentNode.children).forEach((char) => {
          const childNode = currentNode.children[char];
          let failureNode = currentNode.failureLink;
  
          while (failureNode && !failureNode.children[char]) {
            failureNode = failureNode.failureLink;
          }
  
          childNode.failureLink = failureNode ? failureNode.children[char] : this.root;
          queue.push(childNode);
        });
      }
    }
  
    search(paragraph: string): string[] {
      const matches: Set<string> = new Set();
      let node = this.root;
  
      for (const char of paragraph) {
        while (node && !node.children[char]) {
          node = node.failureLink!;
        }
        node = node ? node.children[char] : this.root;
  
        let tempNode = node;
        while (tempNode !== this.root) {
          if (tempNode.isEndOfWord) {
            matches.add(tempNode.keyword!);
          }
          tempNode = tempNode.failureLink!;
        }
      }
  
      return Array.from(matches);
    }
  }

  export const ac = new AhoCorasick(keywords);