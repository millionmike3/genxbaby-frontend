# Behavior Engine

The Behavior Engine is the backend service responsible for analyzing user, lead, and investor behavior across the GEN X BABY platform. It computes impulsiveness scores, classifies behavioral levels, stores granular session metrics, and maintains long-term behavioral profiles.

## Responsibilities

- Ingest raw behavioral metrics from the frontend
- Compute pillar-specific impulsiveness scores:
  - STOCK_SANITIZER
  - CUSTOMER
  - INVESTOR
- Classify behavior into:
  - stable
  - reactive
  - impulsive
  - volatile
- Create BehaviorSession records
- Update BehaviorProfile aggregates
- Provide unified behavior analytics for Admin, Owner, and Investor portals

## Folder Structure

