#!/bin/bash

# Start Claude Code with dangerous skip permissions
# This bypasses all permission checks - use only in trusted environments

echo "Starting Claude Code with permissions bypassed..."
echo "WARNING: This bypasses all permission checks!"
echo "Use only in trusted/sandboxed environments."
echo ""

# Start Claude with dangerous skip permissions flag
claude --dangerously-skip-permissions "$@"
