from collections import deque
from typing import List
from app.models.pipeline import Node, Edge

def analyze_pipeline(nodes: List[Node], edges: List[Edge]) -> dict:
    """
    Analyzes the pipeline graph to count nodes, edges, and verify if it forms a DAG (no cycles).
    """
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Run Kahn's algorithm to check if it's a DAG (no cycles)
    # 1. Build adjacency list and in-degrees
    adj = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    for edge in edges:
        # Avoid issues where edge points to non-existent nodes
        if edge.source not in adj:
            adj[edge.source] = []
        if edge.source not in in_degree:
            in_degree[edge.source] = 0
            
        if edge.target not in adj:
            adj[edge.target] = []
        if edge.target not in in_degree:
            in_degree[edge.target] = 0
            
        adj[edge.source].append(edge.target)
        in_degree[edge.target] += 1
        
    # 2. Initialize queue with nodes of in-degree 0
    queue = deque([node_id for node_id, deg in in_degree.items() if deg == 0])
    
    visited_count = 0
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    # If visited_count matches the total number of nodes, it is a DAG (no cycles)
    is_dag = (visited_count == len(in_degree)) if in_degree else True
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
